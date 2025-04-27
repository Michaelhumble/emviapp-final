
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const ForgotPassword = () => <div>Forgot Password</div>;

const AuthLayout: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default AuthLayout;
