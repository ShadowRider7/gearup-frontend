/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { Category, Gear } from "@/lib/type";
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
  addGearItem,
  updateGearItem,
} from "../../_actions/providerDashboardActions";
import CategorySelect from "./CategorySelect";

type GearFormDialogProps = {
  mode: "create" | "edit";
  item?: Gear;
  categories: Category[];
};

export default function GearFormDialog({
  mode,
  item,
  categories,
}: GearFormDialogProps) {
  const [open, setOpen] = useState(false);

  const action =
    mode === "edit" && item ? updateGearItem.bind(null, item.id) : addGearItem;
  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success !== false) {
      toast.success(
        state.message || (mode === "edit" ? "Gear updated" : "Gear listed"),
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
            <Plus size={14} /> List Gear
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase text-sm">
            {mode === "edit" ? `Edit: ${item?.name}` : "List New Gear Item"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} key={item?.id} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategorySelect
              categories={categories}
              defaultValue={item?.category?.id || item?.categoryId}
            />

            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Item Name
              </Label>
              <Input id="name" name="name" defaultValue={item?.name} required />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="brand"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                defaultValue={item?.brand}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
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
                className="min-h-20"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="pricePerDay"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Price/Day ($)
              </Label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                min="0"
                step="0.01"
                defaultValue={item?.pricePerDay}
                required
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="stock"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Stock Qty
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                defaultValue={item?.stock ?? 1}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <Label
                htmlFor="images"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Image URLs (comma separated)
              </Label>
              <Input
                id="images"
                name="images"
                placeholder="img1.jpg, img2.jpg"
                defaultValue={item?.images?.join(",")}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <Label
                htmlFor="specifications"
                className="text-xs font-mono uppercase text-muted-foreground"
              >
                Specifications (JSON format)
              </Label>
              <Textarea
                id="specifications"
                name="specifications"
                placeholder='{"Color": "Black", "Weight": "2kg"}'
                defaultValue={JSON.stringify(item?.specifications || {})}
                required
                className="min-h-20 font-mono text-xs"
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
                  : "Publish Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
