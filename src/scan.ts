export function scan(obj: { [key: string]: any }, depth: number = 0): string {
  let output = "";
  var k;
  if (obj instanceof Object) {
    for (k in obj) {
      const isLast = k == Object.keys(obj).at(-1);

      if (obj.hasOwnProperty(k)) {
        // Indent
        output += "  ".repeat(depth);
        // Parse $oid
        if (obj[k].hasOwnProperty("$oid")) {
          output += `${k}: ObjectId("${obj[k]["$oid"]}")`;

          if (!isLast) output += ",";
          output += "\n";
          continue;
        }

        if (obj[k].hasOwnProperty("$numberInt")) {
          output += `${k}: ${obj[k]["$numberInt"]}`;
          if (!isLast) output += ",";
          output += "\n";
          continue;
        }

        // Value or Array (int as key) Beginning
        if (!isNaN(parseInt(k))) {
          output += `[`;
        } else {
          output += `${k}: `;
        }

        if (obj[k] instanceof Object) {
          output += "{\n";
          output += scan(obj[k], depth + 1);
          output += "  ".repeat(depth) + "}";
        } else {
          output += `"${obj[k]}"`;
        }

        if (!isNaN(parseInt(k))) output += `]`;
      }

      // Line Endings
      if (!isLast) output += ",";
      output += "\n";
    }
  }
  return output;
}
