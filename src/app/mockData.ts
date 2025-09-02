import { DollarSign, ShoppingCart, Car, Home, Coffee, Gamepad2, Gift, Plane, Book, Music, Heart, Briefcase, Calculator, CreditCard, Wallet, PiggyBank, TrendingUp, TrendingDown } from "lucide-react";

import { LucideIcon } from "lucide-react";

export type TIcons = {
  name: string;
  icon: LucideIcon;
  label: string;
};

export const incomeIcons: TIcons[] = [
  { name: "DollarSign", icon: DollarSign, label: "Зарплата" },
  { name: "Briefcase", icon: Briefcase, label: "Работа" },
  { name: "TrendingUp", icon: TrendingUp, label: "Инвестиции" },
  { name: "Gift", icon: Gift, label: "Подарок" },
  { name: "PiggyBank", icon: PiggyBank, label: "Накопления" },
  { name: "CreditCard", icon: CreditCard, label: "Бонусы" },
];

export const expenseIcons: TIcons[] = [
  { name: "ShoppingCart", icon: ShoppingCart, label: "Покупки" },
  { name: "Car", icon: Car, label: "Транспорт" },
  { name: "Home", icon: Home, label: "Дом" },
  { name: "Coffee", icon: Coffee, label: "Кафе" },
  { name: "Gamepad2", icon: Gamepad2, label: "Развлечения" },
  { name: "Plane", icon: Plane, label: "Путешествия" },
  { name: "Book", icon: Book, label: "Образование" },
  { name: "Music", icon: Music, label: "Подписки" },
  { name: "Heart", icon: Heart, label: "Здоровье" },
  { name: "Calculator", icon: Calculator, label: "Услуги" },
  { name: "Wallet", icon: Wallet, label: "Прочее" },
  { name: "TrendingDown", icon: TrendingDown, label: "Долги" },
];
