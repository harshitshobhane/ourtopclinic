"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export const Navbar = () => {
  const user = useAuth();

  function formatPathName(): string {
    const pathname = usePathname();

    if (!pathname) return "Overview";

    const splitRoute = pathname.split("/");
    const lastIndex = splitRoute.length - 1 > 2 ? 2 : splitRoute.length - 1;

    const pathName = splitRoute[lastIndex];

    const formattedPath = pathName.replace(/-/g, " ");

    return formattedPath;
  }

  const path = formatPathName();

  return (
    <div className="h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-emerald-50 relative group">
      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight font-sans bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent capitalize animate-gradient">
            {path || "Overview"}
          </h1>
          <div className="h-6 w-[1px] bg-gradient-to-b from-emerald-100 to-transparent"></div>
          {/* <p className="text-sm text-emerald-600 animate-fadeIn font-sans font-medium tracking-tight">Welcome back!</p> */}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer group/notif">
          <div className="p-2 rounded-lg bg-emerald-50/50 text-emerald-600 group-hover/notif:bg-emerald-100/50 transition-all duration-300 border border-emerald-100 group-hover/notif:border-emerald-200 group-hover/notif:shadow-sm">
            <Bell className="size-5 transition-transform duration-300 group-hover/notif:scale-110" />
            <p className="absolute -top-1 -right-1 size-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-full text-[10px] flex items-center justify-center font-medium shadow-sm animate-bounce-subtle">
              2
            </p>
          </div>
        </div>

        {user?.userId && (
          <div className="hover:bg-emerald-50/50 p-1 rounded-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200 hover:shadow-sm group/user">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </div>
  );
};