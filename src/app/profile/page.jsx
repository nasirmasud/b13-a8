"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
// import { redirect } from "next/navigation";
import { UpdateUserModal } from "../components/UpdateUserModal";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // if (!user) {
  //   redirect('/login');
  // }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-slate-50/30">
      <Card
        className="w-full max-w-md mx-auto flex flex-col items-center border border-slate-200 shadow-sm p-8 md:p-12 bg-white"
        radius="2xl"
      >
        {/* Profile Image Section */}
        <div className="relative mb-6">
          <Avatar className="h-28 w-28 ring-4 ring-[#4f46e5]/10 shadow-lg">
            <Avatar.Image
              alt={user?.name || "User"}
              src={user?.image}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback className="text-3xl bg-[#1e1b4b] text-white">
              {user?.name?.charAt(0) || "U"}
            </Avatar.Fallback>
          </Avatar>
        </div>

        {/* User Info Section */}
        <div className="text-center space-y-1 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {user?.name}
          </h2>
          <p className="text-slate-500 font-medium">
            {user?.email}
          </p>
        </div>

        {/* Action Section */}
        <div className="w-full pt-6 border-t border-slate-100 flex justify-center">
          <UpdateUserModal />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;