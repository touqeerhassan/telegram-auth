"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

export default function LoginPage() {
  const [Username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validUsername = "TestUser";

    if (Username === validUsername) {
      localStorage.setItem("auth", "true");
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleLogin}>
        <input
          type="Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "100px",
            width: "100%",
            border: "1px solid gray",
            outline: "none",
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TelegramLoginButton
          botName="Test_Devaxl_Bot"
          dataOnauth={(user: TelegramUser) => console.log(user)}
        />
      </form>
    </div>
  );
}
