import React, { useEffect, useState } from "react";
import Accounts from "./Account";
import Transactions from "./Transaction";

export default function Dashboard({ user }) {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const resAccounts = await fetch("http://localhost:5000/api/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(await resAccounts.json());

      const resTransactions = await fetch("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(await resTransactions.json());
    };
    fetchData();
  }, []);

  // Total balance and spending breakdown
  const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Hello, {user?.name}</h1>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Balance</h2>
          <p className="text-2xl font-bold mt-2">${totalBalance}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Expenses</h2>
          <p className="text-2xl font-bold mt-2">${totalExpense}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Accounts</h2>
          <p className="text-2xl font-bold mt-2">{accounts.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Transactions</h2>
          <p className="text-2xl font-bold mt-2">{transactions.length}</p>
        </div>
      </div>

      {/* Budget Planning */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-bold mb-4">Budget Planning</h2>
        <p className="text-gray-600">You can implement budget goals and alerts in the future.</p>
      </div>

      {/* Embedded Accounts & Transactions */}
      <Accounts user={user} />
      <Transactions user={user} />
    </div>
  );
}
