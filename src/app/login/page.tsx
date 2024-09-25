"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [Username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validUsername = "Test";

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
            width: "100%",
            border: "1px solid black",
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid black",
            fontFamily: "700",
            background: "lightblue",
          }}
        >
          Connect Telegram
        </button>
      </form>
    </div>
  );
}
