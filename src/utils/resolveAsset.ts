const files = import.meta.glob("/src/assets/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const byName = Object.fromEntries(
  Object.entries(files).map(([p, url]) => [p.split("/").pop()!, url]),
);
export function resolveAsset(input: string) {
  if (!input) return "";
  const name = input.split("/").pop()!;
  return byName[name] ?? input;
}
