import * as fsBase from "node:fs";
import * as path from "node:path";

const fs = fsBase.promises;

(async () => {
  const data = await fs.readFile(path.join(__dirname, "example.txt"), "utf8");

  console.log(data);
})();
