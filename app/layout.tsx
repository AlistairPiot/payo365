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
        "Créez des liens de paiement en 30 secondes. Solution simple et sécurisée pour freelances et créateurs. Commission de 3% seulement, sans abonnement. Paiements via Stripe.",
    keywords: "lien de paiement, paiement en ligne, freelance, stripe, commission 3%, facturation",
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        ],
        apple: { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    },
    openGraph: {
        title: "Payo365 - Liens de paiement instantanés",
        description: "Créez des liens de paiement en 30 secondes. Seulement 3% de commission.",
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
