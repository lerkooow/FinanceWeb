type TTransaction = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: Date;
  type: "income" | "expense";
  icon: string;
};

export const transactionsData: TTransaction[] = [
  {
    id: 1,
    title: "Продукты в Пятёрочке",
    category: "Продукты",
    amount: -2450,
    date: new Date("2024-12-15"),
    type: "expense",
    icon: "🛒",
  },
  {
    id: 2,
    title: "Заправка автомобиля",
    category: "Транспорт",
    amount: -3200,
    date: new Date("2024-12-14"),
    type: "expense",
    icon: "⛽",
  },
  {
    id: 3,
    title: "Кофе в Starbucks",
    category: "Кафе и рестораны",
    amount: -320,
    date: new Date("2024-12-14"),
    type: "expense",
    icon: "☕",
  },
  {
    id: 4,
    title: "Зарплата",
    category: "Доход",
    amount: 85000,
    date: new Date("2024-12-10"),
    type: "income",
    icon: "💰",
  },
  {
    id: 5,
    title: "Аптека",
    category: "Здоровье",
    amount: -890,
    date: new Date("2024-12-09"),
    type: "expense",
    icon: "💊",
  },
  {
    id: 6,
    title: "Аптека",
    category: "Здоровье",
    amount: -300,
    date: new Date("2024-12-07"),
    type: "expense",
    icon: "💊",
  },
];

export const total: number = 100000;
export const spent: number = 24563;
export const remaining: number = total - spent;
