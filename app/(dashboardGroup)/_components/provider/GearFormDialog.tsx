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
        state.message ||
          (mode === "edit"
            ? "Gear updated successfully"
            : "Gear listed successfully"),
      );
      setOpen(false);
    } else {
      toast.error(
        state.message || state.error || "An unexpected error occurred",
      );
    }
  }, [state, mode]);

  const getSpecsString = () => {
    if (!item?.specifications) return "";
    if (typeof item.specifications === "string") return item.specifications;
    try {
      const str = JSON.stringify(item.specifications);
      return str === "{}" ? "" : str;
    } catch {
      return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-md"
          >
            <Edit3 size={15} />
          </Button>
        ) : (
          <Button
            size="sm"
            className="flex items-center gap-2 font-mono uppercase text-xs bg-green-700 hover:bg-green-800 text-white"
          >
            <Plus size={14} /> List Gear
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-border/80 shadow-lg">
        <DialogHeader className="border-b pb-3 mb-2">
          <DialogTitle className="font-mono uppercase text-xs tracking-wider text-muted-foreground">
            {mode === "edit"
              ? `Edit Configuration: ${item?.name}`
              : "Publish New Gear Listing"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4 pt-2">
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
              <Input
                id="name"
                name="name"
                key={`name-${item?.id}`}
                defaultValue={item?.name}
                required
                className="focus-visible:ring-green-700"
              />
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
                key={`brand-${item?.id}`}
                defaultValue={item?.brand}
                required
                className="focus-visible:ring-green-700"
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
                key={`desc-${item?.id}`}
                defaultValue={item?.description}
                required
                className="min-h-20 focus-visible:ring-green-700"
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
                key={`price-${item?.id}`}
                defaultValue={item?.pricePerDay}
                required
                className="focus-visible:ring-green-700"
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
                key={`stock-${item?.id}`}
                defaultValue={item?.stock ?? 1}
                required
                className="focus-visible:ring-green-700"
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
                placeholder="https://example.com, https://example.com"
                key={`images-${item?.id}`}
                defaultValue={item?.images?.join(",")}
                required
                className="focus-visible:ring-green-700"
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
                key={`specs-${item?.id}`}
                defaultValue={getSpecsString()}
                required
                className="min-h-20 font-mono text-xs focus-visible:ring-green-700"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t mt-2">
            <Button
              type="submit"
              disabled={pending}
              className="w-full md:w-auto font-mono uppercase text-xs bg-green-700 hover:bg-green-800 text-white"
            >
              {pending
                ? "Saving Entry..."
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
