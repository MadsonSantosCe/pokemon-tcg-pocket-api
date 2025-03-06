import path from "path";
import fs from "fs";

const __dirname = path.resolve();
const directoryPath = path.join(__dirname, "public", "uploads");

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

console.log(`Observando a pasta: ${directoryPath}`);

fs.watch(directoryPath, (eventType, filename) => {
  if (eventType === "rename" && filename) {
    const filePath = path.join(directoryPath, filename);

    if (fs.existsSync(filePath)) {
      console.log(
        `Novo arquivo detectado: Nome: ${filename}, Caminho: ${filePath}`
      );
    }
  }
});
