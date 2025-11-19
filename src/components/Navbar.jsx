import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="font-bold text-xl">BankApp</h1>
      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/transactions">Transactions</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
