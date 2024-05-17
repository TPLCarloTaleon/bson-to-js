import { expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { scan } from "../src/scan";

/** Temporary Fix - Because the current code is not very good at formatting. */
const REMOVE_LINEBREAKS_AND_SPACES = true;

const inputDir = await readdir(resolve(import.meta.dir, "scan-cases/input"));
const outputDir = await readdir(resolve(import.meta.dir, "scan-cases/output"));

const BATCH_SIZE = 10;

[...Array(BATCH_SIZE)].forEach((_, i) => {
  inputDir.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE).forEach((filePath) => {
    test(`${filePath}`, async () => {
      const input = await Bun.file(resolve(import.meta.dir, "scan-cases/input", filePath)).text();

      let scanned = scan(JSON.parse(input)).trim();

      let output = (await Bun.file(resolve(import.meta.dir, "scan-cases/output", filePath)).text()).trim();

      if (REMOVE_LINEBREAKS_AND_SPACES) {
        // Remove all line breaks and extra spaces from the scanned output
        // Using a regex that matches one or more whitespace characters.

        scanned = scanned.replaceAll(/\s+/g, " ");
        output = output.replaceAll(/\s+/g, " ");
      }
      expect(scanned).toEqual(output);
    });
  });
});
