import { expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { scan } from "../src/scan";

const inputDir = await readdir(resolve(import.meta.dir, "scan-cases/input"));
const outputDir = await readdir(resolve(import.meta.dir, "scan-cases/output"));

const BATCH_SIZE = 10;

[...Array(BATCH_SIZE)].forEach((_, i) => {
  inputDir.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE).forEach((filePath) => {
    test(`${filePath}`, async () => {
      const input = await Bun.file(resolve(import.meta.dir, "scan-cases/input", filePath)).text();

      const scanned = scan(JSON.parse(input)).trim();

      const output = (await Bun.file(resolve(import.meta.dir, "scan-cases/output", filePath)).text()).trim();

      expect(scanned).toEqual(output);
    });
  });
});
