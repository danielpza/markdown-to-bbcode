// @ts-check
import { fromMarkdown } from "mdast-util-from-markdown";

/**
 * @param {import ("mdast-util-from-markdown/lib").Node} node
 * @return {string} */
function transform(node) {
  switch (node.type) {
    case "root":
      return node.children.map(transform).join("\n");
    case "heading": {
      const children = node.children.map(transform);
      return `[h${node.depth}]${children}[/h${node.depth}]`;
    }
    case "text":
      return node.value;
    case "list": {
      const children = node.children.map(transform).join("\n");
      // TODO support ordered/unordered list
      return `\
[list]
${children}
[/list]\
`;
    }
    case "listItem": {
      const children = node.children.map(transform).join("");
      return `[*]${children}`;
    }
    case "paragraph":
      return node.children.map(transform).join("");
    case "link": {
      const children = node.children.map(transform).join("");
      return `[url=${node.url}]${children}[/url]`;
    }
    default:
      console.error(`Type ${node.type} not supported`);
      return "";
  }
}

/**
 * @param {string} mdstr
 * @return {string}
 */
export function convertMarkdownToSteam(mdstr) {
  return transform(fromMarkdown(mdstr));
}
