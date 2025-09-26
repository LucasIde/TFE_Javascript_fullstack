'use client'

import { useAuth } from "@/components/auth/authContext";
import { redirect } from "next/navigation";
import FriendsList from "@/components/FriendList";

export default function FriendsPage() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="pt-20">
      <FriendsList/>
    </div>
  );
}
