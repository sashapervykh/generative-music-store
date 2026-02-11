import path from "path";
import { registerFont } from "canvas";
import fonts from "../assets/images/fonts/fonts.json" with { type: "json" };

const typedFonts: { fonts: string[]; weights: string[] } = fonts;
export function registerFonts() {
  typedFonts.fonts.forEach((font) => {
    typedFonts.weights.forEach((weight) => {
      const fileName = `${font}_${weight}.ttf`;
      const pathToFile = path.join(
        process.cwd(),
        `src/assets/images/fonts/${fileName}`,
      );
      console.log(pathToFile);
      registerFont(pathToFile, {
        family: `${font}`,
        weight: weight.toLowerCase(),
      });
    });
  });
}
