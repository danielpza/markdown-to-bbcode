// @ts-check
import { fromMarkdown } from "mdast-util-from-markdown";

/**
 * @param {string} name
 * @param {string} children
 */
const tag = (name, children) => `\n[${name}]${children}[/${name}]`;

/**
 * @param {import ("mdast-util-from-markdown/lib").Node} node
 * @return {string} */
function transform(node) {
  switch (node.type) {
    case "root":
      return node.children.map(transform).join("\n");
    case "heading": {
      const children = node.children.map(transform).join("");
      return tag(`h${node.depth}`, children);
    }
    case "text":
      return node.value;
    case "list": {
      const children = node.children.map(transform).join("\n");
      // TODO support ordered/unordered list
      return tag(`list`, "\n" + children + "\n");
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
      console.error(
        // @ts-expect-error -- value can be undefined?
        `Type ${node.type} not supported: \`${JSON.stringify(node.value)}\``,
      );
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
