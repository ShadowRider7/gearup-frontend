/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { SingleOrder } from "./CustomerDashboardClient";
import { createReview } from "../../_actions/customerDashboardActions";
import { toast } from "sonner";

interface ReviewModalProps {
  order: SingleOrder;
  onClose: () => void;
}

export default function ReviewModal({ order, onClose }: ReviewModalProps) {
  const initialRating = (order as SingleOrder)?.review?.rating ?? 5;
  const [rating, setRating] = useState<number>(initialRating);

  const [open, setOpen] = useState(true);

  const [state, formAction, isPending] = useActionState(
    createReview.bind(null, order.id),
    null,
  );

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Review created successfully!");
      handleClose();
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !isPending && handleClose()}>
      <DialogContent className="sm:max-w-md font-sans">
        <DialogHeader>
          <DialogTitle className="font-mono text-base font-bold uppercase tracking-wider">
            Review Gear Item
          </DialogTitle>
          <DialogDescription className="text-xs">
            Share your experience with{" "}
            <strong>{order.gearItem?.name || "this item"}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="rating" value={rating} />

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  disabled={isPending}
                  onClick={() => setRating(star)}
                  className="text-muted-foreground hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Star
                    size={24}
                    className={
                      star <= rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-muted"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Comments
            </label>
            <Textarea
              required
              name="comment"
              rows={4}
              disabled={isPending}
              defaultValue={(order as SingleOrder)?.review?.comment ?? ""}
              placeholder="How was the condition of the gear? Was it easy to use?"
              className="resize-none text-sm bg-muted/30 focus-visible:ring-1"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={handleClose}
              className="font-mono uppercase tracking-wider text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="font-mono font-bold uppercase tracking-wider text-xs gap-1.5"
            >
              {isPending && <Loader2 size={12} className="animate-spin" />}
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
