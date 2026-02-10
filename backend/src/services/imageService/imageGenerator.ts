import type { Song } from "~/types/Song.js";
import { getSongSeed } from "~/utils/getSongSeed.js";
import { SeededRNG } from "~/utils/seededRNG.js";
import pallets from "../../images/colorPallets.json" with { type: "json" };
import gradients from "../../images/gradientTypes.json" with { type: "json" };
import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { AVAILABLE_GRADIENTS } from "./availableGradient.js";
import { DEFAULT_COLORS } from "./defaultColors.js";

const typedPallets: {
  name: string;
  textColor: string;
  backgroundColors: string[];
}[] = pallets;

const typedGradients: string[] = gradients;

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

    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext("2d");

    this.drawGradientBackground(
      ctx,
      gradientType,
      palette.backgroundColors,
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
}

export const imageGenerator = new ImageGenerator();
