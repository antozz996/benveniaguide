import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost-dark"
  | "light"
  | "copper"
  | "quiet";

export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-ivory shadow-soft hover:bg-forest-700 hover:shadow-lift",
  outline:
    "border border-forest/25 bg-transparent text-forest hover:border-forest/60 hover:bg-forest/5",
  "ghost-dark":
    "border border-ivory/30 bg-transparent text-ivory hover:border-ivory/70 hover:bg-ivory/10",
  light: "bg-ivory text-forest hover:bg-white",
  copper: "bg-copper-700 text-white hover:bg-copper-600",
  quiet: "bg-sage-100 text-forest hover:bg-sage-200",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  { href: string } &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = ButtonBaseProps &
  { href?: undefined } &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant = "primary", size = "md", className, children, ...rest } =
      props;
    return (
      <Link
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
