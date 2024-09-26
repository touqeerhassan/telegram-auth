"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  auth_date: number;
  hash: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authToken, setAuthToken] = useState<string | null>();

  useEffect(() => {
    const data = localStorage.getItem("user") || "";
    const token = localStorage.getItem("auth");
    setAuthToken(token);
    if (!token) {
      router.push("/login");
    } else {
      setUserData(JSON.parse(data));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (authToken) {
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
        <p style={{ fontWeight: "bold", fontSize: "32px" }}>
          Hi @{userData?.first_name} {userData?.last_name}
        </p>
        <button
          onClick={handleLogout}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Logout
        </button>
      </div>
    );
  } else {
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
    </div>;
  }
}
