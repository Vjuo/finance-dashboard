import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { transactionsData } from "./data/mockData";
import { getSummary } from "./utils/calculations";

import SummaryCard from "./components/SummaryCard";
import Charts from "./components/Charts";
import TransactionList from "./components/TransactionList";
import ThemeToggle from "./components/ThemeToggle";
import RoleSwitcher from "./components/RoleSwitcher";
import Insights from "./components/Insights";

export default function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", transactionsData);
  const [role, setRole] = useLocalStorage("role", "viewer");
  const [dark, setDark] = useLocalStorage("theme", false);

  const { income, expense, balance } = getSummary(transactions);

  // 🔥 IMPORTANT FIX
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Finance Dashboard
        </h1>

        <div className="flex gap-3">
          <ThemeToggle dark={dark} setDark={setDark} />
          <RoleSwitcher role={role} setRole={setRole} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <Charts transactions={transactions} />

      <Insights transactions={transactions} />

      <TransactionList
        transactions={transactions}
        role={role}
        setTransactions={setTransactions}
      />

    </div>
  );
}