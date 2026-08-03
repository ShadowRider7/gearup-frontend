"use client";

import Link from "next/link";
import Image from "next/image";
import GearUpLogo from "../../public/gearup-logo.svg";
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SiFacebook, SiX, SiInstagram, SiLinkerd } from "react-icons/si";

const footerLinks = {
  product: [
    { label: "Browse Gears", href: "/gears" },
    { label: "Top Categories", href: "/gears?categoryId=All" },
    { label: "Rental Policy", href: "/terms" },
  ],
  company: [
    { label: "About GearUp", href: "/about" },
    { label: "Become a Provider", href: "/register" },
    { label: "Careers", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiX, href: "#", label: "Twitter" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
  { icon: SiLinkerd, href: "#", label: "LinkedIn" },
];
export function Footer() {
  return (
    <footer className="border-t bg-background mt-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90"
            >
              <Image
                src={GearUpLogo}
                alt="GearUp Logo"
                width={140}
                height={40}
                className="w-32 h-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium outdoor gear rental for every adventure. We connect gear
              seekers with providers to make exploration accessible for
              everyone.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground transition-all hover:text-green-700 hover:scale-110"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
                Product
              </h3>
              <nav className="mt-4 space-y-2.5">
                {footerLinks.product.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-green-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
                Company
              </h3>
              <nav className="mt-4 space-y-2.5">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-green-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
                Support
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Phone className="size-4 text-green-700 shrink-0 mt-0.5" />
                  <span className="font-mono text-xs">+880 19738 24849</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Mail className="size-4 text-green-700 shrink-0 mt-0.5" />
                  <span className="font-mono text-xs truncate">
                    support@gearup.com
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-green-700 shrink-0 mt-0.5" />
                  <span className="text-xs">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 opacity-50" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-tighter">
            &copy; {new Date().getFullYear()} GearUp Platform. Built for
            Millions.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-green-700"
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
