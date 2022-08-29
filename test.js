import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { convertMarkdownToSteam } from "./index.js";

/**
 * @param desc {string}
 * @param source {string}
 * @param expected {string}
 */
function test(desc, source, expected) {
  it(desc, () => {
    assert.equal(convertMarkdownToSteam(source), expected);
  });
}

describe("header", () => {
  test("h1", "# Header", "[h1]Header[/h1]");
  test("h2", "## Header", "[h2]Header[/h2]");
});

test(
  "list",
  `\
- hello
- world\
`,
  `\
[list]
[*]hello
[*]world
[/list]\
`
);
