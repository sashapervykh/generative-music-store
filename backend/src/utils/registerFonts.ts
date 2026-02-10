import { registerFont } from "canvas";
import fonts from "../images/fonts/fonts.json" with { type: "json" };

const typedFonts: { fonts: string[]; weights: string[] } = fonts;
export function registerFonts() {
  typedFonts.fonts.forEach((font) => {
    typedFonts.weights.forEach((weight) => {
      const fileName = `${font}_${weight}.ttf`;
      registerFont(`src/images/fonts/${fileName}`, {
        family: font,
        weight: weight.toLowerCase(),
      });
    });
  });
}
