"use client";

import Link from "next/link";
import {
  Heart,
  Share2,
  MessageSquare,
  Gift,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "Browse Gear", href: "/gear" },
    { label: "Categories", href: "/categories" },
    { label: "Reviews", href: "/reviews" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Heart, href: "#", label: "Like" },
  { icon: Share2, href: "#", label: "Share" },
  { icon: MessageSquare, href: "#", label: "Message" },
  { icon: Gift, href: "#", label: "Rewards" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background mt-5">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Northstar Gear
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium outdoor gear rental for every adventure.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground">Product</h3>
            <nav className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <nav className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground">Get in Touch</h3>
            <div className="mt-4 space-y-3">
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Phone className="size-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 flex-shrink-0" />
                <span>support@northstar.com</span>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 flex-shrink-0" />
                <span>123 Adventure St, CO 80210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Northstar Gear. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
