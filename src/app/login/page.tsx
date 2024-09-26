"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

const botName = process.env.NEXT_PUBLIC_BOT_NAME;
const hardcodedUsername = process.env.NEXT_PUBLIC_HARDCODED_USER;

export default function LoginPage() {
  const [Username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (Username === hardcodedUsername) {
      console.log("Username is valid. Proceed to Telegram authentication.");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleTelegramAuth = (user: TelegramUser) => {
    localStorage.setItem("auth", user.hash);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("validUsername", hardcodedUsername!);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

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
          type="text"
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

        {Username === hardcodedUsername ? (
          <TelegramLoginButton
            botName={botName!}
            dataOnauth={handleTelegramAuth}
          />
        ) : Username ? (
          <div>Invalid Username</div>
        ) : (
          <div>Enter Username</div>
        )}
      </form>
    </div>
  );
}
