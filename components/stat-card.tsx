import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatNumber } from "@/utils";

interface CardProps {
  title: string;
  icon: LucideIcon;
  note: string;
  value: number | string;
  className?: string;
  iconClassName?: string;
  link: string;
}

const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon />;
};
export const StatCard = ({
  title,
  icon,
  note,
  value,
  className,
  iconClassName,
  link,
}: CardProps) => {
  // Accent color and gradient based on card type
  let accent = "from-blue-400 to-blue-600 border-blue-200";
  if (title.toLowerCase().includes("cancel")) accent = "from-rose-400 to-rose-600 border-rose-200";
  if (title.toLowerCase().includes("pending")) accent = "from-yellow-400 to-yellow-600 border-yellow-200";
  if (title.toLowerCase().includes("complete")) accent = "from-emerald-400 to-emerald-600 border-emerald-200";

  return (
    <Card
      className={cn(
        `relative w-full md:w-[330px] 2xl:w-[250px] rounded-3xl border-none shadow-2xl bg-white/60 backdrop-blur-xl overflow-hidden transition-all duration-300 group
        before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] before:from-white/40 before:to-transparent before:opacity-60 before:pointer-events-none
        hover:shadow-emerald-200/40 hover:scale-[1.04]`,
        className
      )}
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl bg-gradient-to-r ${accent} z-10`} />
      <CardHeader className="flex flex-row items-center justify-between py-4 capitalize bg-transparent">
        <h3 className="font-semibold text-lg text-gray-800 tracking-tight drop-shadow-sm">{title}</h3>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="font-normal text-xs bg-transparent p-2 h-7 hover:underline text-gray-500 hover:text-primary"
        >
          <Link href={link}>See Details</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-5 mt-2">
          {/* Animated, gradient ring icon */}
          <div
            className={cn(
              `relative w-16 h-16 flex items-center justify-center rounded-full bg-white/30 border-2 border-white shadow-lg
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:${accent} before:opacity-80 before:z-0
              group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300`,
              iconClassName
            )}
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
          >
            <span className="relative z-10 group-hover:animate-pulse">
            <CardIcon icon={icon} />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm tracking-tight">
              {typeof value === 'number' ? formatNumber(value) : value}
            </h2>
            <span className="text-xs text-gray-500 font-medium leading-tight">{note}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};