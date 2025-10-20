import { ConnectStripe } from "@/components/dashboard/connect-stripe";
import { CreatePaymentLink } from "@/components/dashboard/create-payment-link";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { PaymentLinksTable } from "@/components/dashboard/payment-links-table";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StripePendingBanner } from "@/components/dashboard/stripe-pending-banner";
import { Footer } from "@/components/footer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/api/auth/signin");
    }

    let user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            paymentLinks: {
                orderBy: { createdAt: "desc" },
                take: 10,
            },
        },
    });

    if (!user) {
        redirect("/api/auth/signin");
    }

    // Vérifier et mettre à jour le statut Stripe Connect si nécessaire
    if (user.stripeAccountId && !user.stripeOnboarded) {
        try {
            const account = await stripe.accounts.retrieve(
                user.stripeAccountId
            );
            const onboarded =
                account.charges_enabled && account.details_submitted;

            if (onboarded) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { stripeOnboarded: true },
                    include: {
                        paymentLinks: {
                            orderBy: { createdAt: "desc" },
                            take: 10,
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error checking Stripe account:", error);
        }
    }

    // Statistiques
    const totalLinks = await prisma.paymentLink.count({
        where: { userId: user.id },
    });

    const paidLinks = await prisma.paymentLink.count({
        where: { userId: user.id, paid: true },
    });

    const totalRevenue = await prisma.paymentLink.aggregate({
        where: { userId: user.id, paid: true },
        _sum: { amount: true },
    });

    // Données du graphique : revenus des 30 derniers jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const paidLinksForChart = await prisma.paymentLink.findMany({
        where: {
            userId: user.id,
            paid: true,
            paidAt: { gte: thirtyDaysAgo },
        },
        select: {
            amount: true,
            paidAt: true,
        },
        orderBy: { paidAt: "asc" },
    });

    // Grouper les revenus par jour
    const revenueByDay = new Map<string, number>();
    paidLinksForChart.forEach((link) => {
        if (link.paidAt) {
            const date = link.paidAt.toISOString().split("T")[0]; // Format: YYYY-MM-DD
            const current = revenueByDay.get(date) || 0;
            revenueByDay.set(date, current + link.amount);
        }
    });

    // Créer un tableau avec tous les jours des 30 derniers jours
    const chartData = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        chartData.push({
            date: dateStr,
            revenue: revenueByDay.get(dateStr) || 0,
        });
    }

    const stats = {
        totalLinks,
        paidLinks,
        totalRevenue: totalRevenue._sum.amount || 0,
        chartData,
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <DashboardHeader user={user} />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {!user.stripeAccountId ? (
                    <ConnectStripe />
                ) : !user.stripeOnboarded ? (
                    <div className="space-y-8">
                        <StripePendingBanner />
                        <DashboardStats stats={stats} />
                        <RevenueChart data={stats.chartData} />
                        <CreatePaymentLink />
                        <PaymentLinksTable paymentLinks={user.paymentLinks} />
                    </div>
                ) : (
                    <div className="space-y-8">
                        <DashboardStats stats={stats} />
                        <RevenueChart data={stats.chartData} />
                        <CreatePaymentLink />
                        <PaymentLinksTable paymentLinks={user.paymentLinks} />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
