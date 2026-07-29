"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

// Navigation items array for easy management
const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

// User dropdown menu items
const USER_MENU_ITEMS = [
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
  { label: "Logout", icon: LogOut, action: "logout", isDangerous: true },
];

export function Navbar() {
  const handleUserAction = (action: string) => {
    console.log(`User action: ${action}`);
    // Handle user actions here
    // e.g., routing, API calls, etc.
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">Logo</div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-1">
                <Avatar className="size-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* User Info Section */}
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john.doe@example.com
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
        </div>
      </div>
    </nav>
  );
}
