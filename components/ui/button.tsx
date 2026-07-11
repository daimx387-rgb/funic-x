import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const styles=cva("inline-flex items-center justify-center gap-3 text-[10px] font-medium tracking-[.14em] transition-transform duration-300",{variants:{variant:{light:"bg-[#f2efe8] px-6 py-4 text-[#090909]",outline:"border border-[#3b3a36] px-5 py-3 text-[#f2efe8]"}},defaultVariants:{variant:"light"}});
export const Button=forwardRef<HTMLButtonElement,ButtonHTMLAttributes<HTMLButtonElement>&VariantProps<typeof styles>>(({className,variant,...props},ref)=><button ref={ref} className={cn(styles({variant}),className)} {...props}/>);Button.displayName="Button";
