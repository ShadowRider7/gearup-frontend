/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { Category } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createCategory,
  updateCategory,
} from "../../_actions/AdminDashboardAction";

type CategoryFormDialogProps = {
  mode: "create" | "edit";
  item?: Category;
};

export default function CategoryFormDialog({
  mode,
  item,
}: CategoryFormDialogProps) {
  const [open, setOpen] = useState(false);

  const action =
    mode === "edit" && item
      ? updateCategory.bind(null, item.id)
      : createCategory;

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success !== false) {
      toast.success(
        state.message ||
          (mode === "edit" ? "Category updated" : "Category created"),
      );
      setOpen(false);
    } else {
      toast.error(state.message || state.error || "Something went wrong");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Edit3 size={14} />
          </button>
        ) : (
          <Button
            size="sm"
            className="flex items-center gap-2 font-mono uppercase text-xs"
          >
            <Plus size={14} /> Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase text-sm">
            {mode === "edit" ? `Edit: ${item?.name}` : "Create New Category"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} key={item?.id} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Category Name
              </Label>
              <Input id="name" name="name" defaultValue={item?.name} required />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="description"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={item?.description}
                required
                className="min-h-24"
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={pending}
              className="w-full md:w-auto font-mono uppercase text-xs"
            >
              {pending
                ? "Saving..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
