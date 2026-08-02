"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllUsers } from "@/lib/type";
import { AdminPagination } from "./AdminPagination";

const PAGE_SIZE = 4;

interface UsersTabProps {
  allUsers: AllUsers["data"]["allUsers"];
  handleUserToggle: (id: string) => void;
  isPending: boolean;
}

export default function UsersTab({
  allUsers,
  handleUserToggle,
  isPending,
}: UsersTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  console.log("Raw Users Payload Data Object:", allUsers);

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or email..."
          className="pl-9 bg-card border-border"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              {["User", "Email", "Role", "Joined", "Status", "Action"].map(
                (h) => (
                  <TableHead
                    key={h}
                    className="px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-widest"
                  >
                    {h}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedUsers.map((u) => {
              // Normalize status checking cleanly here
              const isActive = u.status.toUpperCase() === "ACTIVE";

              return (
                <TableRow
                  key={u.id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                    {u.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground">
                    {u.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-wide">
                    {u.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs font-mono text-muted-foreground">
                    {u.createdAt}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={`text-xs font-mono uppercase tracking-wide font-semibold ${
                        isActive ? "text-emerald-500" : "text-destructive"
                      }`}
                    >
                      {isActive ? "● Active" : "○ Suspended"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleUserToggle(u.id)}
                      className={`h-auto p-0 text-xs font-mono uppercase tracking-wide font-bold ${
                        isActive ? "text-destructive" : "text-emerald-500"
                      }`}
                    >
                      {isPending
                        ? "Updating..."
                        : isActive
                          ? "Suspend"
                          : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        label="users"
        onPageChange={setPage}
      />
    </div>
  );
}
