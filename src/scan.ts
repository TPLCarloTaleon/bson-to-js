export function scan(obj: { [key: string]: any }, depth: number = 0): string {
  let output = "";
  var k;

  if (!(obj instanceof Object)) throw Error(`${obj} is not an object.`);

  const rootIsObject = typeof obj === "object" && !Array.isArray(obj) && obj !== null;
  // Handle if Root object.
  if (rootIsObject) {
    // Root is an object
    output += "{\n";
    depth += 1;
  }

  for (k in obj) {
    const isLast = k == Object.keys(obj).at(-1);

    if (obj.hasOwnProperty(k)) {
      // Indent
      output += "  ".repeat(depth);

      // Parse null
      if (obj[k] === null) {
        output += `${k}: null`;

        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // Parse boolean
      if (typeof obj[k] === "boolean") {
        output += `${k}: ${obj[k]}`;

        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // Parse $date
      if (obj[k].hasOwnProperty("$date")) {
        if (obj[k]["$date"].hasOwnProperty("$numberLong")) {
          output += `${k}: new Date(${obj[k]["$date"]["$numberLong"]})`;
        } else if (obj[k]["$date"].hasOwnProperty("$numberInt")) {
          output += `${k}: new Date(${obj[k]["$date"]["$numberInt"]})`;
        }

        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // Parse $oid
      if (obj[k].hasOwnProperty("$oid")) {
        output += `${k}: ObjectId("${obj[k]["$oid"]}")`;

        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // Parse $numberInt
      if (obj[k].hasOwnProperty("$numberInt")) {
        output += `${k}: ${obj[k]["$numberInt"]}`;
        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // Parse number only.
      if (typeof obj[k] === "number") {
        output += `${k}: ${obj[k]}`;
        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // Parse array
      if (Array.isArray(obj[k])) {
        output += `${k}: [\n`;
        for (let i = 0; i < obj[k].length; i++) {
          const isLastInArray = i === obj[k].length - 1;
          output += "  ".repeat(depth + 1);
          if (typeof obj[k][i] === "object") {
            output += `${scan(obj[k][i], depth + 1)}`;
          } else if (typeof obj[k][i] === "number") {
            output += `${obj[k][i]}`;
          } else {
            output += `"${obj[k][i]}"`;
          }

          if (!isLastInArray) output += ",";

          // if (i !== obj[k].length - 1)
          output += "\n";
        }
        output += "  ".repeat(depth) + "]";
        if (!isLast) output += ",";
        output += "\n";
        continue;
      }

      // (identifier key) or (0) Beginning (an object)
      if (!isNaN(parseInt(k))) {
        output += `[`;
      } else {
        output += `${k}: `;
      }

      if (obj[k] instanceof Object) {
        // output += "{\n";
        output += scan(obj[k], depth + 1);
        // output += "  ".repeat(depth) + "}";
      } else {
        output += `"${obj[k]}"`;
      }

      if (!isNaN(parseInt(k))) output += `]`;
    }

    // Line Endings
    if (!isLast) output += ",";
    output += "\n";
  }

  // Handle if Root object.
  if (rootIsObject) {
    // Root is an object
    output += "  ".repeat(depth) + "}";
    // output += "}";
  }

  return output;
}
