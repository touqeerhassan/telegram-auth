"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [Username, setUsername] = useState<string>();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      router.push("/login");
    }
    setUsername("TestUser")
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
      <p style={{fontWeight:'bold', fontSize:'32px'}}>Hi @{Username}</p>
      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Logout
      </button>
    </div>
  );
}
