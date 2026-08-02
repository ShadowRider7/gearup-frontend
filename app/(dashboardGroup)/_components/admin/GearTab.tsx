"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllGears } from "@/lib/type";
import { AdminPagination } from "./AdminPagination";

const PAGE_SIZE = 5;

interface GearTabProps {
  allGear: AllGears["data"]["gearItemsList"];
}

export default function GearTab({ allGear }: GearTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filters catalog entries by Item Title, Category name, or Provider name string matrices
  const filteredGear = allGear.filter(
    (g) =>
      g.name?.toLowerCase().includes(search.toLowerCase()) ||
      g.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
      g.provider?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredGear.length / PAGE_SIZE);
  const pagedGear = filteredGear.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="space-y-4">
      {/* Search Filtering Input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Safely sets index window back to boundary root on query shifts
          }}
          placeholder="Search gear listings by item name, provider, or category..."
          className="pl-9 bg-card border-border h-10 shadow-sm"
        />
      </div>

      {/* Tabular Layout Container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              {["Item", "Provider", "Category", "Price", "Status"].map((h) => (
                <TableHead
                  key={h}
                  className="px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedGear.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground text-sm font-mono"
                >
                  No matching gear listings found.
                </TableCell>
              </TableRow>
            ) : (
              pagedGear.map((g) => (
                <TableRow
                  key={g.id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          g.images && g.images[0]
                            ? g.images[0]
                            : "/placeholder-image.png"
                        }
                        alt={g.name || "Gear listing"}
                        className="w-10 h-8 object-cover rounded bg-muted border border-border/40"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {g.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground">
                    {g.provider?.name || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground">
                    {g.category?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-mono text-sm text-foreground font-semibold">
                    ${g.pricePerDay}/day
                  </TableCell>
                  <TableCell
                    className="px-4 py-3 text-xs font-mono uppercase tracking-wide font-semibold"
                    style={{ color: g.isAvailable ? "#10b981" : "#94a3b8" }}
                  >
                    {g.isAvailable ? "Available" : "Unavailable"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredGear.length}
        label="items"
        onPageChange={setPage}
      />
    </div>
  );
}
