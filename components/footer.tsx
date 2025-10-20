"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="border-t border-gray-200 bg-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo et description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 w-fit mb-4" onClick={scrollToTop}>
                            <Image
                                src="/icon_payo365.svg"
                                alt="Payo365 Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl px-4 py-2 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                                Payo365
                            </div>
                        </Link>
                        <p className="text-gray-600 max-w-md">
                            La solution ultra simple pour freelances et
                            créateurs. Générez un lien de paiement et recevez
                            vos paiements instantanément.
                        </p>
                    </div>

                    {/* Produit */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Produit
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/#features"
                                    className="text-gray-600 hover:text-indigo-600 transition"
                                >
                                    Fonctionnalités
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Légal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/legal/cgv"
                                    className="text-gray-600 hover:text-indigo-600 transition"
                                >
                                    CGV
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/cgu"
                                    className="text-gray-600 hover:text-indigo-600 transition"
                                >
                                    CGU
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/confidentialite"
                                    className="text-gray-600 hover:text-indigo-600 transition"
                                >
                                    Confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/mentions-legales"
                                    className="text-gray-600 hover:text-indigo-600 transition"
                                >
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} Payo365. Tous droits
                            réservés.
                        </p>
                        <p className="text-gray-500 text-sm mt-2 md:mt-0">
                            Paiements sécurisés par Stripe
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
