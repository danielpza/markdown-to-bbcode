#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { convertMarkdownToSteam } from "./index.js";

// see https://stackoverflow.com/a/45486670/6051261
const mdstr = readFileSync(process.stdin.fd).toString();

console.log(convertMarkdownToSteam(mdstr));
