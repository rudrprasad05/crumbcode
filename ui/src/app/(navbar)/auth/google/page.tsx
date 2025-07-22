"use client";

import React from "react";

const LoginPage = () => {
  const handleLogin = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${apiBase}auth/google-login?returnUrl=http://localhost:3000/dashboard`;
    // window.location.href = `http://localhost:5080/signin-google?returnUrl=http://localhost:3000/dashboard`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
