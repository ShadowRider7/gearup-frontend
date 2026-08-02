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
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { NavbarProps } from "@/lib/type";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Browse gears", href: "/gears" },
];

const USER_MENU_ITEMS = [
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
  { label: "Logout", icon: LogOut, action: "logout", isDangerous: true },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const userRole = user?.data?.userProfile?.role?.toLowerCase();
  const handleUserAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("Logged out successfully!");
      router.push("/login");
    }
  };

  return (
    <nav className="border-b mb-5 border-border bg-background">
      <div className="mx-auto my-2 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image
                src={GearUpLogo}
                alt="GearUp Logo"
                width={150}
                height={50}
                className="w-32 h-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {user?.success && userRole && (
              <Link
                href={`/dashboard/${userRole}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-2 pr-1">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={user.data?.userProfile?.profile.profilePhoto}
                      alt="profile-photo"
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* User Info Section */}
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {user.data?.userProfile?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.data?.userProfile?.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                {/* Menu Items */}
                {USER_MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserAction(item.action)}
                      className={
                        item.isDangerous
                          ? "text-destructive focus:text-destructive"
                          : ""
                      }
                    >
                      <Icon className="mr-2 size-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/login"}>
              <Button className="cursor-pointer">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
