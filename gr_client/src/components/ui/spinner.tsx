import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
   variants: {
      show: {
         true: "flex",
         false: "hidden",
      },
   },
   defaultVariants: {
      show: true,
   },
});

const loaderVariants = cva("animate-spin", {
   variants: {
      size: {
         small: "size-6",
         medium: "size-8",
         large: "size-12",
      },
   },
   defaultVariants: {
      size: "small",
   },
});

interface SpinnerContentProps extends VariantProps<typeof spinnerVariants>, VariantProps<typeof loaderVariants> {
   className?: string;
   children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps) {
   return (
      <span className={spinnerVariants({ show })}>
         <Loader className={cn(loaderVariants({ size }), className)} />
         {children}
      </span>
   );
}
