"use client";

import { useEffect, useState } from "react";

interface DashboardStatsProps {
    stats: {
        totalLinks: number;
        paidLinks: number;
        totalRevenue: number;
    };
}

function CountUp({
    end,
    duration = 1000,
    decimals = 0,
    suffix = "",
}: {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - percentage, 4);

            setCount(end * easeOut);

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <>
            {count.toFixed(decimals)}
            {suffix}
        </>
    );
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    const platformFee = stats.totalRevenue * 0.08;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">
                        Liens créés
                    </p>
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                    </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                    <CountUp end={stats.totalLinks} duration={1200} />
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">
                        Paiements reçus
                    </p>
                    <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                    <CountUp end={stats.paidLinks} duration={1200} />
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">
                        Revenu total
                    </p>
                    <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                    <CountUp
                        end={stats.totalRevenue / 100}
                        duration={1200}
                        decimals={2}
                        suffix="€"
                    />
                </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium opacity-90">
                        Commission Payo365 (8%)
                    </p>
                    <svg
                        className="w-5 h-5 opacity-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                </div>
                <p className="text-3xl font-bold">
                    <CountUp
                        end={platformFee / 100}
                        duration={1200}
                        decimals={2}
                        suffix="€"
                    />
                </p>
            </div>
        </div>
    );
}
