"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Formater les données pour le graphique (convertir centimes en euros)
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    }),
    revenue: item.revenue / 100, // Convertir centimes en euros
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Revenus des 30 derniers jours</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}€`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm text-gray-600">{payload[0].payload.date}</p>
                    <p className="text-lg font-bold text-indigo-600">
                      {Number(payload[0].value).toFixed(2)} €
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
        <span>Revenus journaliers</span>
      </div>
    </div>
  );
}
