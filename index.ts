import { scan } from "./src/scan";

const inputPath = "./bson-input.txt";

async function main() {
  const inputFile = Bun.file(inputPath);

  if (!(await inputFile.exists())) {
    throw Error("No input file called 'bson-input.txt'.");
  }

  const inputContent = await inputFile.text();

  let splittedInputContent = inputContent.split("// BREAK");

  // 1. CLEAN

  splittedInputContent = splittedInputContent.map((input) => input.trim()).filter((input) => input !== "");

  // const parsedObjects: any[] = [];
  const parsedOutputs: string[] = [];
  splittedInputContent.forEach((input) => {
    const parsedObject = JSON.parse(input);

    const output = scan(parsedObject);
    parsedOutputs.push(output);
    // parsedObjects.push(parsedObject);
  });

  console.log(parsedOutputs.at(0));

  console.log("\n\n🙌 Done Writing.");
}

main();
