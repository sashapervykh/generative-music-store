declare module "tonegenerator" {
  interface ToneGeneratorOptions {
    freq: number;
    lengthInSecs: number;
    sampleRate: number;
    amplitude: number;
    waveType: string;
  }

  export default function toneGenerator(
    options: ToneGeneratorOptions,
  ): Int16Array;
}
