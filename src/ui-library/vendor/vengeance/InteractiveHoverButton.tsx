// Vengeance UI, MIT. Utility classes translated to scoped CSS. See LICENSE.
import { ArrowRight } from "lucide-react"

const cn = (...values: (string | undefined)[]) => values.filter(Boolean).join(" ")

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "v-hover-button",
        className
      )}
      {...props}
    >
      <div className="v-hover-front">
        <div className="v-hover-dot"></div>
        <span className="v-hover-label">
          {children}
        </span>
      </div>
      <div className="v-hover-back" aria-hidden="true">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  )
}
