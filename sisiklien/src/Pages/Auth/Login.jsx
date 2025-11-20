import React from "react";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Link from "@/Pages/Layouts/Components/Link";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Form from "@/Pages/Layouts/Components/Form";
import { useNavigate } from "react-router-dom";
import { login } from "@/Utils/Apis/AuthApi";
import { showSuccess, showError } from "@/Utils/Helpers/toastHelper";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const user = await login(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      showSuccess("Login berhasil");
      navigate("/admin/dashboard");
    } catch (err) {
      showError(err.message);
    }
  };

  return (
      <Card className="max-w-md">
        <Heading as="h2">Login</Heading>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Masukkan email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" placeholder="Masukkan password" required />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Ingat saya</span>
            </label>
            <Link href="#" className="text-sm">Lupa password?</Link>
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </Form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Belum punya akun? <Link href="#">Daftar</Link>
        </p>
      </Card>
  );
};

export default Login;