"use client";

import React, { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const PAGE_SIZE = 5;

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
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return allUsers || [];
    return (allUsers || []).filter(
      (u) =>
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query),
    );
  }, [allUsers, search]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or email..."
          className="pl-9 bg-background focus-visible:ring-green-700"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              pagedUsers.map((u) => {
                const isActive = u.status?.toUpperCase() === "ACTIVE";
                const isCurrentPending = isPending && activeId === u.id;

                return (
                  <TableRow key={u.id} className="hover:bg-muted/20">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-50 text-green-800 text-xs font-bold uppercase">
                            {u.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{u.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {u.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs font-mono">
                      {u.role}
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={isActive ? "secondary" : "destructive"}
                        className={`rounded-full px-2 py-0.5 text-xs font-medium border ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        {isActive ? "Active" : "Suspended"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Button
                        size="sm"
                        variant={isActive ? "outline" : "default"}
                        disabled={isPending}
                        onClick={() => {
                          setActiveId(u.id);
                          handleUserToggle(u.id);
                        }}
                        className={`h-8 w-24 text-xs font-medium ${
                          isActive
                            ? "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            : "bg-green-700 hover:bg-green-800 text-white"
                        }`}
                      >
                        {isCurrentPending ? (
                          <Loader2 className="h-3 w-3 animate-spin mx-auto" />
                        ) : isActive ? (
                          "Suspend"
                        ) : (
                          "Activate"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {filteredUsers.length > 0 && (
        <AdminPagination
          page={page}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          label="users"
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
