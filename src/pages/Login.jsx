import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.username);
    navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button text="Login" type="submit" color="blue" />
      </form>
    </div>
  );
}
