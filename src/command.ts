import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "bson-to-js <bson>",
    "Converts a bson into a mongodb query",
    (args) =>
      args.positional("bson", {
        description: "The bson to convert",
        type: "string",
      }),
    (argv) => {
      console.log(argv.bson, "test");
    }
  )
  .parse();

// import { EJSON } from "bson";

// process.stdout.write(`Write the BSON here (e.g. { "_id": { "$oid": "0123456789" }, ... }):\n`);

// const answer = console.read;

// for await (const line of console) {
//   console.log(`You typed: ${line}`);
// }

// // console.log("Hello via Bun!");

// // console.log(nice);

// // console.log(EJSON.deserialize(nice));
