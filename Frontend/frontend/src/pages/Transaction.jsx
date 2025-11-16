import React, { useState, useEffect } from "react";

export default function Transactions({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [type, setType] = useState("Expense"); // Expense or Income
  const [recurring, setRecurring] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ desc, amount, category, type, recurring }),
      });
      const data = await res.json();
      setTransactions([...transactions, data]);
      setDesc("");
      setAmount("");
      setCategory("General");
      setType("Expense");
      setRecurring(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      {/* Add Transaction Form */}
      <form
        onSubmit={handleAddTransaction}
        className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option>General</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Expense</option>
          <option>Income</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
          Recurring
        </label>
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2">
          Add Transaction
        </button>
      </form>

      {/* Transactions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactions.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{t.desc}</h3>
              <p className="text-gray-500">{t.category} - {t.type}</p>
              <p className={`font-bold ${t.type === "Expense" ? "text-red-600" : "text-green-600"}`}>
                ${t.amount}
              </p>
              {t.recurring && <span className="text-sm text-gray-400">Recurring</span>}
            </div>
            <button
              onClick={() => handleDelete(t._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
