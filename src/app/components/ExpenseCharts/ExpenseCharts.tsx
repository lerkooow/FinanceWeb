"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import s from "./ExpenseCharts.module.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF1493", "#32CD32", "#FFD700", "#DC143C", "#00CED1", "#FF4500", "#2E8B57"];
type ExpenseChartsProps = {
  transactions: {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: Date;
    type: string;
    icon: string | null;
    userId: number;
    description: string | null;
  }[];
};

export const ExpenseCharts = ({ transactions }: ExpenseChartsProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const prepareChartData = () => {
    const expenses = transactions.filter((t) => t.type === "expense");

    const grouped = expenses.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  };

  const data = prepareChartData();

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 425);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className={s.expenseCharts}>
      <div>
        <h2 className={s.expenseCharts__budgetTitle}>Обзор бюджета по категориям</h2>
        <p className={s.expenseCharts__budgetSubtitle}>Мониторинг финансовых показателей по категориям</p>
      </div>
      <div className={s.expenseCharts__pie}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={!isMobile ? ({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : "0"}%` : undefined}
              outerRadius="80%"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `${value} ₽`} />
            {isMobile && <Legend verticalAlign="bottom" height={36} />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
