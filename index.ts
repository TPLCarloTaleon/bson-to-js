import { EJSON } from "bson";

const inputPath = "./bson-input.txt";
const outputPath = "./bson-output.txt";

async function main() {
  const inputFile = Bun.file(inputPath);

  if (!(await inputFile.exists())) {
    throw Error("No input file called 'bson-input.txt'.");
  }

  const inputContent = JSON.parse(await inputFile.text());
  const parsedObject = EJSON.deserialize(inputContent);

  console.log(parsedObject);

  await Bun.write(outputPath, JSON.stringify(parsedObject, null, 2));
}

main();
