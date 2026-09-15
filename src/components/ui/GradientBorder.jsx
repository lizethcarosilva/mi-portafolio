/**
 * Renders a 1px gradient ring (gold -> magenta -> violet) around its content.
 *
 * fill: "solid" (opaque bg) | "panel" (translucent violet fill) | "glass" (blurred
 * blue-gray frosted fill) | "clear" (fully see-through)
 *
 * "solid"/"panel" use a padding-based nested wrapper: the outer box paints the
 * gradient, an opaque(ish) inner box covers everything but a 1px rim.
 *
 * "clear" draws the ring as an SVG stroked rect instead. A nested transparent
 * box can't work here — it would only reveal the outer box's own gradient
 * fill, not what's truly behind the element — and this environment's
 * multi-layer `background-clip` (padding-box + border-box) does not clip as
 * expected either, so SVG stroke is the reliable option for a genuinely
 * see-through middle.
 */
export default function GradientBorder({
  as: Comp = "div",
  fill = "solid",
  radius = "rounded-[10px]",
  className = "",
  innerClassName = "",
  children,
  ...props
}) {
  if (fill === "clear") {
    // The SVG ring below is positioned "absolute inset-0", which needs a
    // positioned ancestor to anchor to. Only default to relative when the
    // caller hasn't already supplied their own position utility (e.g. the
    // hero badges pass "absolute ..." themselves for placement).
    const hasPosition = /\b(absolute|fixed|sticky|static|relative)\b/.test(className);
    return (
      <Comp
        className={`inline-flex ${hasPosition ? "" : "relative"} ${radius} ${className} ${innerClassName}`}
        {...props}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <rect
            x="1.5%"
            y="1.5%"
            width="97%"
            height="97%"
            rx="9"
            ry="9"
            fill="none"
            stroke="url(#brandIconGradient)"
            strokeWidth="1.5"
          />
        </svg>
        {children}
      </Comp>
    );
  }

  const fillClass = fill === "panel" ? "fill-panel" : fill === "glass" ? "fill-glass" : "bg-bg";

  return (
    <Comp
      className={`inline-flex bg-gradient-to-br from-brand-gold via-brand-pink to-brand-violet p-[1px] ${radius} ${className}`}
      {...props}
    >
      <span className={`inline-flex h-full w-full ${radius} ${fillClass} ${innerClassName}`}>
        {children}
      </span>
    </Comp>
  );
}
