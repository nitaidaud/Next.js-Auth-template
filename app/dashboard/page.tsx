import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  const logout = async () => {
    "use server";
    await signOut({ redirectTo: "/auth/login" });
  };

  return (
    <div>
      <h2>name: {session?.user?.name}</h2>
      <h2>email: {session?.user?.email}</h2>
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </div>
  );
};

export default DashboardPage;
