"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [Username, setUsername] = useState("TestUser");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <p>@{Username}</p>
      </div>
      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Logout
      </button>
    </div>
  );
}
