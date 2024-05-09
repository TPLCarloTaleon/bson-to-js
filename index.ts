import { scan } from "./src/scan";

const inputPath = "./bson-input.txt";
const outputPath = "./bson-output.txt";

async function main() {
  const inputFile = Bun.file(inputPath);

  if (!(await inputFile.exists())) {
    throw Error("No input file called 'bson-input.txt'.");
  }

  const inputContent = await inputFile.text();

  let splittedInputContent = inputContent.split("// BREAK");

  // 1. CLEAN

  splittedInputContent = splittedInputContent.map((input) => input.trim()).filter((input) => input !== "");

  // 2. Parse and Write
  const outputFile = Bun.file(outputPath);
  await Bun.write(outputPath, ""); // Reset

  const writer = await outputFile.writer();

  splittedInputContent.forEach((input, index) => {
    // Parse
    const parsedObject = JSON.parse(input);

    const output = scan(parsedObject);

    // Write
    writer.write(output);

    // If not last item, separate with a // BREAK
    if (index !== splittedInputContent.length - 1) writer.write("\n\n// BREAK\n\n");
  });

  console.log(`\n\n🙌 Done Writing to ${outputPath}.`);
}

main();
