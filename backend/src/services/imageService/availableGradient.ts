import type { CanvasGradient, CanvasRenderingContext2D } from "canvas";

export const AVAILABLE_GRADIENTS: Record<
  string,
  (ctx: CanvasRenderingContext2D, w: number, h: number) => CanvasGradient
> = {
  "linear-top-bottom": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createLinearGradient(w / 2, 0, w / 2, h),
  "linear-bottom-top": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createLinearGradient(w / 2, h, w / 2, 0),
  "linear-left-right": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createLinearGradient(0, h / 2, w, h / 2),
  "linear-right-left": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createLinearGradient(w, h / 2, 0, h / 2),
  "linear-diagonal-tl-br": (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
  ) => ctx.createLinearGradient(0, 0, w, h),
  "linear-diagonal-bl-tr": (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
  ) => ctx.createLinearGradient(0, h, w, 0),
  "radial-center": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2),
  "radial-top-left": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(w, h)),
  "radial-top-right": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createRadialGradient(w, 0, 0, w, 0, Math.max(w, h)),
  "radial-bottom-left": (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createRadialGradient(0, h, 0, 0, h, Math.max(w, h)),
  "radial-bottom-right": (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
  ) => ctx.createRadialGradient(w, h, 0, w, h, Math.max(w, h)),
  default: (ctx: CanvasRenderingContext2D, w: number, h: number) =>
    ctx.createLinearGradient(w / 2, 0, w / 2, h),
};
