type Level = 1 | 2 | 3 | 4 | 5 | 6;

const levelStyles: Record<Level, string> = {
  1: "text-3xl font-black",
  2: "text-xl font-bold",
  3: "text-lg font-bold",
  4: "text-base font-semibold",
  5: "text-sm font-semibold",
  6: "text-xs font-semibold uppercase tracking-wide",
};

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  level: Level;
  visualLevel?: Level;
  children: React.ReactNode;
}

export function Heading({ level, visualLevel, children, className = "", ...props }: HeadingProps) {
  const Tag = `h${level}` as `h${Level}`
  const classes = `${levelStyles[visualLevel ?? level]} ${className}`.trim();
  return <Tag className={classes} {...props}>{children}</Tag>
}