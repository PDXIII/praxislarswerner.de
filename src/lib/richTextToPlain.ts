export function richTextToPlain(node: any): string {
  if (!node) return "";
  if (node.nodeType === "text") return node.value ?? "";
  return (node.content ?? []).map(richTextToPlain).join(" ").replace(/\s+/g, " ").trim();
}
