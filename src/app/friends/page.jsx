'use client'

import { useAuth } from "@/components/auth/authContext";
import { redirect } from "next/navigation";

export default function FriendsPage() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <main>
      <div>Friends</div>
    </main>
  );
}