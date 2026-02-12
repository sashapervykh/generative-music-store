import type { Song } from "~/types/Song.js";
import { getSongSeed } from "~/utils/getSongSeed.js";
import { SeededRNG } from "~/utils/seededRNG.js";
import pallets from "../../assets/images/colorPallets.json" with { type: "json" };
import gradients from "../../assets/images/gradientTypes.json" with { type: "json" };
import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { AVAILABLE_GRADIENTS } from "./availableGradient.js";
import { DEFAULT_COLORS } from "./defaultColors.js";
import {
  ARTIST_Y,
  DARK_STROKE,
  FONT_SIZE,
  FONT_WEIGHTS,
  HEIGHT,
  LIGHT_COLORS,
  LIGHT_STROKE,
  TEXT_WIDTH,
  TEXT_X_ALIGN,
  TEXT_Y_ALIGN,
  TITLE_Y,
  WIDTH,
} from "~/assets/images/coversConstants.js";

const typedPallets: {
  name: string;
  textColor: string;
  backgroundColors: string[];
}[] = pallets;

const typedGradients: string[] = gradients;

class ImageGenerator {
  width = WIDTH;
  height = HEIGHT;

  createAllCovers(seed: string, songs: Song[], page: number) {
    const songsWithImage: Song[] = [];
    songs.forEach((song) => {
      const cover = this.createCover(seed, song, page);
      songsWithImage.push({ ...song, cover });
    });
    return songsWithImage;
  }
  createCover(seed: string, song: Song, page: number) {
    const songSeed = getSongSeed(seed, page, song.id - 1);
    const rng = new SeededRNG(songSeed.toString());
    const palette = rng.choice(typedPallets);
    const gradientType = rng.choice(typedGradients);
    const fontWeight = rng.choice(FONT_WEIGHTS);
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
    this.drawGradientBackground(ctx, gradientType, palette.backgroundColors);
    this.drawAllText(
      ctx,
      song.title,
      song.artist,
      fontWeight,
      palette.textColor,
    );
    const coverString = canvas.toBuffer("image/png").toString("base64");
    return `data:image/png;base64,${coverString}`;
  }

  private drawGradientBackground(
    ctx: CanvasRenderingContext2D,
    type: string,
    colors: string[],
  ) {
    const gradientFunction =
      AVAILABLE_GRADIENTS[type] ?? AVAILABLE_GRADIENTS.default;
    if (!gradientFunction) throw new Error("Gradient function is not received");
    const gradient = gradientFunction(ctx, this.width, this.height);
    const [c1, c2, c3] = colors;
    gradient.addColorStop(0, c1 ?? DEFAULT_COLORS.FIRST_BACKGROUND);
    gradient.addColorStop(0.5, c2 ?? DEFAULT_COLORS.SECOND_BACKGROUND);
    gradient.addColorStop(1, c3 ?? DEFAULT_COLORS.THIRD_BACKGROUND);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawAllText(
    ctx: CanvasRenderingContext2D,
    title: string,
    artist: string,
    fontWeight: string,
    textColor: string,
  ) {
    this.addText(ctx, fontWeight, title, textColor, TITLE_Y);
    this.addText(ctx, fontWeight, artist, textColor, ARTIST_Y);
  }

  addText(
    ctx: CanvasRenderingContext2D,
    fontWeight: string,
    text: string,
    textColor: string,
    y: number,
  ) {
    const maxTextWidth = WIDTH * TEXT_WIDTH;
    let titleFontSize = FONT_SIZE;
    let textY = y * HEIGHT;
    ctx.font = `${fontWeight} ${titleFontSize}px Sans`;
    while (ctx.measureText(text).width > maxTextWidth && titleFontSize > 10) {
      titleFontSize--;
      ctx.font = `${fontWeight} ${titleFontSize}px Sans`;
    }
    ctx.fillStyle = textColor;
    ctx.textAlign = TEXT_X_ALIGN;
    ctx.textBaseline = TEXT_Y_ALIGN;
    ctx.fillText(text, WIDTH / 2, textY);
    this.addTextStroke(ctx, textColor, text, WIDTH / 2, textY);
  }

  addTextStroke(
    ctx: any,
    textColor: string,
    text: string,
    x: number,
    y: number,
  ) {
    const isLightText = LIGHT_COLORS.includes(textColor);
    ctx.strokeStyle = isLightText ? DARK_STROKE : LIGHT_STROKE;
    ctx.lineWidth = 1;
    ctx.strokeText(text, x, y);
  }
}

export const imageGenerator = new ImageGenerator();
