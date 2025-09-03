import { Book, Calculator, Car, Coffee, CreditCard, DollarSign, Gamepad2, Gift, Heart, Music, PiggyBank, Plane, ShoppingCart, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Home from "./page";

export type TIcons = {
  name: string;
  label: string;
};

export const incomeIcons: TIcons[] = [
  { name: "DOLLAR", label: "Зарплата" },
  { name: "INVESTMENTS", label: "Инвестиции" },
  { name: "GIFT", label: "Подарок" },
  { name: "PIGGY_BANK", label: "Накопления" },
  { name: "CREDIT_CARD", label: "Бонусы" },
];

export const expenseIcons: TIcons[] = [
  { name: "GROCERY", label: "Продукты" },
  { name: "CAR", label: "Транспорт" },
  { name: "HOME", label: "Дом" },
  { name: "COFFEE", label: "Кафе" },
  { name: "ENTERTAINMENT", label: "Развлечения" },
  { name: "PLANE", label: "Путешествия" },
  { name: "BOOK", label: "Образование" },
  { name: "MUSIC", label: "Подписки" },
  { name: "HEART", label: "Здоровье" },
  { name: "CALCULATOR", label: "Услуги" },
  { name: "WALLET", label: "Прочее" },
  { name: "TRENDING_DOWN", label: "Долги" },
];

export const categoryIcons = {
  DOLLAR: DollarSign,
  INVESTMENTS: TrendingUp,
  GIFT: Gift,
  PIGGY_BANK: PiggyBank,
  CREDIT_CARD: CreditCard,
  GROCERY: ShoppingCart,
  CAR: Car,
  HOME: Home,
  COFFEE: Coffee,
  GAMEPAD2: Gamepad2,
  PLANE: Plane,
  BOOK: Book,
  MUSIC: Music,
  HEART: Heart,
  CALCULATOR: Calculator,
  WALLET: Wallet,
  TRENDING_DOWN: TrendingDown,
};
