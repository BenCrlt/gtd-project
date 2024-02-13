import clsx from "clsx";
import { PropsWithChildren } from "react";

type TypographyVariant = "h1" | "p" | "small";

type TypographyProps = {
  variant?: TypographyVariant;
  className?: string;
};

export default function Typography({
  children,
  variant = "p",
  className,
}: PropsWithChildren<TypographyProps>) {
  switch (variant) {
    case "p":
      return (
        <p className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}>
          {children}
        </p>
      );
    case "h1":
      return (
        <h1
          className={clsx(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className
          )}
        >
          {children}
        </h1>
      );
    case "small":
      return (
        <small className={clsx("text-sm font-medium leading-none", className)}>
          {children}
        </small>
      );
    default:
      throw Error("NO VARIANT");
  }
}
