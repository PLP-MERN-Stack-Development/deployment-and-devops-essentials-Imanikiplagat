import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-10">

        {/* LEFT: OVERVIEW */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to BankApp</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Your trusted digital bank — secure, fast, and built for modern financial freedom.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="bg-white p-5 shadow rounded-xl">
              <h3 className="font-semibold text-lg">🔒 Bank-Level Security</h3>
              <p className="text-sm text-gray-600 mt-1">Advanced encryption & 2-Factor Authentication.</p>
            </div>

            <div className="bg-white p-5 shadow rounded-xl">
              <h3 className="font-semibold text-lg">⚡ Fast Transactions</h3>
              <p className="text-sm text-gray-600 mt-1">Send and receive money instantly.</p>
            </div>

            <div className="bg-white p-5 shadow rounded-xl">
              <h3 className="font-semibold text-lg">📱 Mobile Friendly</h3>
              <p className="text-sm text-gray-600 mt-1">Access your bank anywhere, anytime.</p>
            </div>

            <div className="bg-white p-5 shadow rounded-xl">
              <h3 className="font-semibold text-lg">🌍 Worldwide Access</h3>
              <p className="text-sm text-gray-600 mt-1">International transfers made simple.</p>
            </div>

          </div>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="bg-white p-8 rounded-xl shadow-lg lg:w-[380px] w-full">

          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border mt-1 focus:outline-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg border mt-1 focus:outline-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white text-center py-4 shadow mt-10">
        <p className="font-bold text-lg">BankApp</p>
        <p className="text-gray-600 text-sm">Your trusted digital banking partner.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="text-blue-600 text-sm">Privacy Policy</a>
          <a href="#" className="text-blue-600 text-sm">Terms</a>
          <a href="#" className="text-blue-600 text-sm">Contact</a>
        </div>
      </footer>

    </div>
  );
}
