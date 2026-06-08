// Simple markdown → HTML converter (no external deps).
// Shared by the blog post and project detail renderers.

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(
    /```([a-z]*)\n([\s\S]*?)```/g,
    (_match, _lang, code) =>
      `<pre class="blog-code-block"><code>${escapeHtml(code.trim())}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="blog-inline-code">$1</code>'
  );

  // Tables
  html = html.replace(
    /(?:^|\n)((?:\|.+\|(?:\n|$))+)/g,
    (_match, tableBlock: string) => {
      const rows = tableBlock.trim().split("\n");
      if (rows.length < 2) return tableBlock;

      const headerCells = rows[0]
        .split("|")
        .filter((c) => c.trim())
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");

      // Skip separator row (row[1])
      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<div class="blog-table-wrapper"><table class="blog-table"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
    }
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="blog-h1">$1</h1>');

  // Images (must come before links to avoid conflict with ![...](...)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="blog-img" loading="lazy" />'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Unordered lists
  html = html.replace(
    /(?:^|\n)((?:- .+(?:\n|$))+)/g,
    (_match, listBlock: string) => {
      const items = listBlock
        .trim()
        .split(/\n(?=- )/)
        .map((item) => `<li>${item.replace(/^- /, "").trim()}</li>`)
        .join("");
      return `<ul class="blog-ul">${items}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /(?:^|\n)((?:\d+\.\s.+(?:\n|$))+)/g,
    (_match, listBlock: string) => {
      const items = listBlock
        .trim()
        .split(/\n(?=\d+\.)/)
        .map((item) => `<li>${item.replace(/^\d+\.\s/, "").trim()}</li>`)
        .join("");
      return `<ol class="blog-ol">${items}</ol>`;
    }
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="blog-hr" />');

  // Paragraphs — wrap remaining text blocks
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // Don't wrap blocks that are already HTML elements
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<img") ||
        trimmed.startsWith("<table")
      ) {
        return trimmed;
      }
      return `<p class="blog-p">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}
