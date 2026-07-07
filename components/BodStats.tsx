"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from "recharts";
import { motion } from "framer-motion";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

// ----------------------
// Types
// ----------------------

type ChartData = {
  year: string;
  amount: number;
  isTotal: boolean;
};

// ----------------------
// Data
// ----------------------

const data: ChartData[] = [
  { year: "2022-23", amount: 125.41, isTotal: false },
  { year: "2024-25", amount: 228.44, isTotal: false },
  { year: "2026 (To-date)", amount: 94.54, isTotal: false },
  { year: "Total", amount: 448.4, isTotal: true },
];

// ----------------------
// Tooltip
// ----------------------

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const isTotal = label === "Total";

    return (
      <div
        className={`p-4 rounded-xl backdrop-blur-md border shadow-2xl ${
          isTotal
            ? "bg-[#134e4a]/90 border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
            : "bg-[#0f294d]/90 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        }`}
      >
        <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>

        <p
          className={`text-2xl font-bold flex items-baseline gap-1 ${
            isTotal ? "text-teal-300" : "text-white"
          }`}
        >
          {Number(payload[0].value).toFixed(2)}
          <span className="text-xs font-normal opacity-70 ml-1">
            PKR Million
          </span>
        </p>
      </div>
    );
  }

  return null;
};

// ----------------------
// Main Component
// ----------------------

export default function FinancialChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0a2342] w-full font-sanss text-white relative overflow-hidden">
     

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#112d4e]/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl h-[450px] sm:h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
              onMouseMove={(state) => {
                if (
                  state &&
                  state.activeTooltipIndex !== undefined
                ) {
                  setHoveredIndex(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff"
                vertical={false}
                opacity={0.05}
              />

              {/* X Axis */}
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 500 }}
                dy={15}
              />

              {/* Y Axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 13 }}
                dx={-10}
              />

              {/* Tooltip */}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
              />

              {/* Bars */}
              <Bar
                dataKey="amount"
                radius={[8, 8, 0, 0]}
                maxBarSize={80}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isTotal ? "#14b8a6" : "#3b82f6"}
                    opacity={
                      hoveredIndex === null || hoveredIndex === index
                        ? 1
                        : 0.6
                    }
                    className="transition-opacity duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}