import React, { useState, useEffect } from "react";

export default function Accounts({ user }) {
  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [balance, setBalance] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountName, accountType, balance }),
      });
      const data = await res.json();
      setAccounts([...accounts, data]);
      setAccountName("");
      setAccountType("");
      setBalance("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    try {
      await fetch(`http://localhost:5000/api/accounts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(accounts.filter((acc) => acc._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Accounts</h1>

      {/* Add Account Form */}
      <form
        onSubmit={handleAddAccount}
        className="bg-white p-6 rounded-xl shadow mb-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold">Add New Account</h2>
        <input
          type="text"
          placeholder="Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Account Type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Account
        </button>
      </form>

      {/* Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div key={acc._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{acc.accountName}</h3>
              <p className="text-gray-500">{acc.accountType}</p>
              <p className="font-bold">${acc.balance}</p>
            </div>
            <button
              onClick={() => handleDelete(acc._id)}
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
