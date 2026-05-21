/**
 * PlotDecoration — hand-rolled inline SVG plot, used as page decoration.
 *
 * The plot IS content, not chrome. Each lab card passes its own `data` array
 * (small numbers, ~6–12 points). Renders a soft area + line plot with a faint
 * grid, tuned for the Labs cream palette (warm orange line on cream cards).
 *
 * No dependencies. No runtime cost. SSR-safe.
 */

type Props = {
  /** Small numeric series — values should sit in a similar order of magnitude. */
  data: number[];
  /** Stroke color. Defaults to brand warm orange. */
  stroke?: string;
  /** Area fill color. Defaults to brand orange at low opacity. */
  fill?: string;
  /** Width in CSS pixels. */
  width?: number;
  /** Height in CSS pixels. */
  height?: number;
  /** Optional aria-label for assistive tech. */
  label?: string;
  /**
   * Render a quiet placeholder when data is missing (e.g., lab has no repo
   * yet). Without this, the cell collapses and the right column looks
   * broken. Defaults to true.
   */
  emptyPlaceholder?: boolean;
};

export function PlotDecoration({
  data,
  stroke = "#D97757",
  fill = "rgba(217, 119, 87, 0.12)",
  width = 160,
  height = 56,
  label,
  emptyPlaceholder = true,
}: Props) {
  if (!data.length) {
    if (!emptyPlaceholder) return null;
    // No-signal state — a dashed flat baseline so the row stays balanced
    // and the missing-data state reads as "intentional", not broken.
    const baselineY = height / 2;
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role={label ? "img" : "presentation"}
        aria-label={label ? `${label} — no signal yet` : undefined}
        aria-hidden={label ? undefined : true}
        className="overflow-visible"
      >
        <line
          x1={4}
          x2={width - 4}
          y1={baselineY}
          y2={baselineY}
          stroke="#C8C5BC"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        <text
          x={width / 2}
          y={baselineY - 6}
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fill="#A3A097"
          textAnchor="middle"
          letterSpacing="0.05em"
        >
          no signal yet
        </text>
      </svg>
    );
  }

  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1 || 1)) * w;
    const y = pad + h - ((v - min) / range) * h;
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");

  const areaPath =
    `M${points[0][0].toFixed(1)} ${(height - pad).toFixed(1)} ` +
    points.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") +
    ` L${points[points.length - 1][0].toFixed(1)} ${(height - pad).toFixed(1)} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="overflow-visible"
    >
      {/* faint horizontal grid lines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad}
          x2={width - pad}
          y1={pad + h * t}
          y2={pad + h * t}
          stroke="#E8E6DD"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
      ))}
      <path d={areaPath} fill={fill} />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill={stroke} />
      ))}
    </svg>
  );
}
