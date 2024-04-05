import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

console.log("Inicio...");
const workbook = new ExcelJS.Workbook();
var xlsx = await workbook.xlsx.readFile("./src/Glosario_Pathfinder.xlsx");
const sheet = xlsx.worksheets[0];
const files = fs.readdirSync("./translation/es/");
for (const fileName of files) {
  if(!fileName .includes(".json")) continue;
  const file = "./translation/es/" + fileName;
  const data = fs.readFileSync(file);
  const object = JSON.parse(data);
  sheet.eachRow((row) => {
    for (const key in object.entries) {
      if (Object.hasOwnProperty.call(object.entries, key)) {
        if (key.toLowerCase() == row.getCell("A").value.toLowerCase()) {
          object.entries[key].name = capitalizeEachWord(row.getCell("B").value);
        }
      }
    }
  });
  fs.writeFileSync(path.join(file), JSON.stringify(object, null, 2));
}
console.log("Fin...");