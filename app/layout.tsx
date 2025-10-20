import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Payo365 - Liens de paiement en ligne pour freelances et créateurs",
    description:
        "Créez des liens de paiement en 30 secondes. Solution simple et sécurisée pour freelances et créateurs. Commission de 8% tout inclus, sans abonnement. Paiements via Stripe.",
    keywords: "lien de paiement, paiement en ligne, freelance, stripe, commission 8%, facturation",
    icons: {
        icon: [
            { url: '/icon_payo365.svg', type: 'image/svg+xml' },
        ],
    },
    openGraph: {
        title: "Payo365 - Liens de paiement instantanés",
        description: "Créez des liens de paiement en 30 secondes. Seulement 8% de commission tout inclus.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
