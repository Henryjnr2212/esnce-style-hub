/**
 * ProductVisual — renders product imagery. When the product has a real photo
 * URL, that photo is shown over a tinted backdrop matching the swatch. When
 * no URL is provided, a stylized monochrome placeholder is rendered instead.
 */
type Props = {
  swatch: string;
  image?: string;
  alt?: string;
  label?: string;
  className?: string;
  rounded?: "xl" | "2xl" | "3xl" | "none";
};

export function ProductVisual({
  swatch,
  image,
  alt = "",
  label = "ESNCE",
  className = "",
  rounded = "2xl",
}: Props) {
  const radius =
    rounded === "none"
      ? ""
      : rounded === "xl"
        ? "rounded-xl"
        : rounded === "3xl"
          ? "rounded-3xl"
          : "rounded-2xl";

  return (
    <div
      className={`relative overflow-hidden ${radius} ${className}`}
      style={{
        background: `radial-gradient(120% 80% at 30% 20%, color-mix(in oklab, ${swatch} 70%, white) 0%, ${swatch} 60%, color-mix(in oklab, ${swatch} 80%, black) 100%)`,
      }}
    >
      {image ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <span
            className="font-black tracking-[0.4em] uppercase opacity-25"
            style={{
              color: "color-mix(in oklab, " + swatch + " 30%, white)",
              fontSize: "18%",
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
