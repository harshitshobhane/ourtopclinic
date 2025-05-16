import { getRole } from "@/utils/roles";
import {
  Bell,
  LayoutDashboard,
  List,
  ListOrdered,
  Logs,
  LucideIcon,
  Pill,
  Receipt,
  Settings,
  SquareActivity,
  User,
  UserRound,
  Users,
  UsersRound,
  MessageCircle,
  CalendarCheck,
  FileText,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { LogoutButton } from "./logout-button";
import Image from "next/image";

const ACCESS_LEVELS_ALL = [
  "admin",
  "doctor",
  "patient",
];

const SidebarIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon className="size-5 text-emerald-600" />;
};

export const Sidebar = async () => {
  const role = await getRole();

  const SIDEBAR_LINKS = [
    {
      label: "MENU",
      links: [
        {
          name: "Dashboard",
          href: "/",
          access: ACCESS_LEVELS_ALL,
          icon: LayoutDashboard,
        },
        {
          name: "Profile",
          href: "/patient/self",
          access: ["patient"],
          icon: User,
        },
      ],
    },
    {
      label: "Manage",
      links: [
        {
          name: "Users",
          href: "/record/users",
          access: ["admin"],
          icon: Users,
        },
        {
          name: "Doctors",
          href: "/record/doctors/list",
          access: ["admin"],
          icon: User,
        },
        {
          name: "Patients",
          href: "/record/patients",
          access: ["admin", "doctor", "nurse"],
          icon: UsersRound,
        },
        {
          name: "Appointments",
          href: "/record/appointments",
          access: ["admin", "doctor", "nurse"],
          icon: CalendarCheck,
        },
        {
          name: "Medical Records",
          href: "/record/medical-records",
          access: ["admin", "doctor", "nurse"],
          icon: SquareActivity,
        },
        {
          name: "Billing Overview",
          href: "/record/billing",
          access: ["admin", "doctor"],
          icon: Receipt,
        },
        {
          name: "Patient Management",
          href: "/nurse/patient-management",
          access: ["nurse"],
          icon: Users,
        },
        {
          name: "Administer Medications",
          href: "/nurse/administer-medications",
          access: ["admin", "doctor", "nurse"],
          icon: Pill,
        },
        {
          name: "Appointments",
          href: "/record/appointments/",
          access: ["patient"],
          icon: CalendarCheck,
        },
        {
          name: "Records",
          href: "/patient/self",
          access: ["patient"],
          icon: FileText,
        },
        {
          name: "Prescription",
          href: "#",
          access: ["patient"],
          icon: Pill,
        },
        {
          name: "Billing",
          href: "/patient/self?cat=payments",
          access: ["patient"],
          icon: Receipt,
        },
      ],
    },
    {
      label: "System",
      links: [
        {
          name: "Messages",
          href: "/messages",
          access: ACCESS_LEVELS_ALL,
          icon: MessageCircle,
        },
        {
          name: "Audit Logs",
          href: "/admin/audit-logs",
          access: ["admin"],
          icon: Logs,
        },
        {
          name: "Settings",
          href: "/admin/system-settings",
          access: ["admin"],
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white/80 backdrop-blur-sm border-r border-emerald-50 relative group overflow-hidden will-change-transform">
      {/* Animated border right */}
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 will-change-transform"></div>

      <div className="p-4">
        <div className="flex flex-col items-center lg:items-start gap-3 mb-8 group/logo">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="OurTop Clinic Logo"
              width={43}
              height={43}
              className="rounded-full object-contain"
              priority
            />
            <span className="hidden lg:inline-block font-bold text-lg tracking-tight font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 will-change-opacity bg-gradient-to-r from-[#b98d7b] to-[#4eb6b1] bg-clip-text text-transparent" style={{letterSpacing: '0.5px'}}>
              OurTopClinic
            </span>
          </Link>
        </div>

        <div className="space-y-6">
          {SIDEBAR_LINKS.map((el) => (
            <div key={el.label} className="space-y-1">
              <span className="hidden lg:block text-xs font-semibold font-sans tracking-wider text-emerald-600 uppercase px-2 animate-fadeIn opacity-0 group-hover:opacity-100 transition-opacity duration-200 will-change-opacity">
                {el.label}
              </span>

              <div className="space-y-1">
                {el.links.map((link) => {
                  if (link.access.includes(role.toLowerCase())) {
                    return (
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-emerald-50/50 hover:text-emerald-600 transition-[background,color,box-shadow] duration-200 group/link border border-transparent hover:border-emerald-100 hover:shadow-sm will-change-opacity"
                        key={link.name}
                      >
                        <div className="group-hover/link:scale-110 transition-transform duration-200 will-change-transform">
                          <SidebarIcon icon={link.icon} />
                        </div>
                        <span className="hidden lg:block text-sm font-medium font-sans group-hover/link:translate-x-1 transition-transform duration-200 whitespace-nowrap opacity-0 group-hover:opacity-100 will-change-opacity">
                          {link.name}
                        </span>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-emerald-50">
        <LogoutButton />
      </div>
    </div>
  );
};