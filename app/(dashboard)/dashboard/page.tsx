"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { session, logout } = useAuth();
  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
