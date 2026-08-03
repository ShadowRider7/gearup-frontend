"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GearUpLogo from "../../public/gearup-logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  Settings,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import { NavbarProps } from "@/lib/type";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Browse gears", href: "/gears" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const userRole = user?.data?.userProfile?.role?.toLowerCase();

  const handleUserAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("Logged out successfully!");
      router.push("/login");
    } else if (action === "dashboard") {
      router.push(`/dashboard/${userRole}`);
    } else {
      router.push(`/${action}`);
    }
  };

  return (
    <nav className="border-b mb-5 border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90"
            >
              <Image
                src={GearUpLogo}
                alt="GearUp Logo"
                width={150}
                height={50}
                className="w-28 md:w-32 h-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-green-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full ring-offset-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage
                        src={user.data?.userProfile?.profile?.profilePhoto}
                        alt="User profile"
                      />
                      <AvatarFallback className="bg-green-50 text-green-700 text-xs font-bold uppercase">
                        {user.data?.userProfile?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 p-2"
                  sideOffset={8}
                >
                  <div className="flex items-center gap-3 px-2 py-3 mb-1 bg-muted/30 rounded-lg">
                    <Avatar className="h-10 w-10 border border-white">
                      <AvatarImage
                        src={user.data?.userProfile?.profile?.profilePhoto}
                      />
                      <AvatarFallback className="text-xs">
                        {user.data?.userProfile?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate uppercase tracking-tight">
                        {user.data?.userProfile?.name}
                      </p>
                      <span className="text-[10px] w-fit font-mono font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-800 uppercase leading-none mt-1">
                        {user.data?.userProfile?.role}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    onClick={() => handleUserAction("dashboard")}
                    className="cursor-pointer py-2 focus:bg-green-50 focus:text-green-700"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleUserAction("profile")}
                    className="cursor-pointer py-2 focus:bg-green-50 focus:text-green-700"
                  >
                    <UserIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">My Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleUserAction("settings")}
                    className="cursor-pointer py-2 focus:bg-green-50 focus:text-green-700"
                  >
                    <Settings className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">
                      Account Settings
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    onClick={() => handleUserAction("logout")}
                    className="cursor-pointer py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Log out
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"}>
                <Button className="bg-green-700 hover:bg-green-800 text-white px-6 font-mono uppercase tracking-widest text-xs h-9">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
