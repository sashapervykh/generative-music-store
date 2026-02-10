import type { Song } from "~/types/Song.js";
import { getSongSeed } from "~/utils/getSongSeed.js";
import { SeededRNG } from "~/utils/seededRNG.js";
import pallets from "../../images/colorPallets.json" with { type: "json" };
import gradients from "../../images/gradientTypes.json" with { type: "json" };
import fonts from "../../images/fonts/fonts.json" with { type: "json" };
import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { AVAILABLE_GRADIENTS } from "./availableGradient.js";
import { DEFAULT_COLORS } from "./defaultColors.js";

const typedPallets: {
  name: string;
  textColor: string;
  backgroundColors: string[];
}[] = pallets;

const typedGradients: string[] = gradients;

const typedFonts: { fonts: string[]; weights: string[] } = fonts;

class ImageGenerator {
  createAllCovers(seed: string, songs: Song[], page: number) {
    const songsWithImage = [];
    songs.forEach((song) => {
      const image = this.createCover(seed, song, page);
      songsWithImage.push({ ...song, image });
    });
    return songsWithImage;
  }
  createCover(seed: string, song: Song, page: number) {
    const songSeed = getSongSeed(seed, page, song.id - 1);
    const rng = new SeededRNG(songSeed.toString());
    const palette = rng.choice(typedPallets);
    const gradientType = rng.choice(typedGradients);
    const fontFamily = rng.choice(typedFonts.fonts);
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
    this.drawGradientBackground(
      ctx,
      gradientType,
      palette.backgroundColors,
      200,
      200,
    );
    this.drawText(
      ctx,
      song.title,
      song.artist,
      fontFamily,
      palette.textColor,
      200,
      200,
    );
    const coverString = canvas.toBuffer("image/png").toString("base64");
    return `data:image/png;base64,${coverString}`;
  }

  private drawGradientBackground(
    ctx: CanvasRenderingContext2D,
    type: string,
    colors: string[],
    w: number,
    h: number,
  ) {
    const gradientFunction =
      AVAILABLE_GRADIENTS[type] ?? AVAILABLE_GRADIENTS.default;
    if (!gradientFunction) throw new Error("Gradient function is not received");
    const gradient = gradientFunction(ctx, w, h);
    const [c1, c2, c3] = colors;
    gradient.addColorStop(0, c1 ?? DEFAULT_COLORS.FIRST_BACKGROUND);
    gradient.addColorStop(0.5, c2 ?? DEFAULT_COLORS.SECOND_BACKGROUND);
    gradient.addColorStop(1, c3 ?? DEFAULT_COLORS.THIRD_BACKGROUND);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }

  drawText(
    ctx: any,
    title: string,
    artist: string,
    fontFamily: string,
    textColor: string,
    w: number,
    h: number,
  ) {
    const safeFont = `"${fontFamily}", "Noto Sans"`;
    const maxTextWidth = w * 0.9;
    const titleY = h * 0.42;
    const artistY = h * 0.62;

    let titleFontSize = Math.floor(h * 0.11);
    ctx.font = `bold ${titleFontSize}px ${safeFont}`;

    while (ctx.measureText(title).width > maxTextWidth && titleFontSize > 12) {
      titleFontSize--;
      ctx.font = `bold ${titleFontSize}px ${safeFont}`;
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, w / 2, titleY);

    this.addTextStroke(ctx, textColor, title, w / 2, titleY);

    let artistFontSize = Math.floor(h * 0.07);
    ctx.font = `regular ${artistFontSize}px ${safeFont}`;

    while (
      ctx.measureText(artist).width > maxTextWidth &&
      artistFontSize > 10
    ) {
      artistFontSize--;
      ctx.font = `regular ${artistFontSize}px ${safeFont}`;
    }

    ctx.fillText(artist, w / 2, artistY);
    this.addTextStroke(ctx, textColor, artist, w / 2, artistY);
  }

  addTextStroke(
    ctx: any,
    textColor: string,
    text: string,
    x: number,
    y: number,
  ) {
    const isLightText = [
      "#FFFFFF",
      "#F8FAFC",
      "#FEF2F2",
      "#F0FDF4",
      "#FFF1F2",
      "#F5F5F4",
      "#EDE9FE",
      "#F8FAF5",
    ].some((light) => textColor.startsWith(light));

    ctx.strokeStyle = isLightText ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeText(text, x, y);
  }
}

export const imageGenerator = new ImageGenerator();
