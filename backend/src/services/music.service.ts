import tonegenerator from "tonegenerator";
import wavEncoder from "wav-encoder";
import { getSongSeed } from "../utils/getSongSeed.js";
import { SeededRNG } from "../utils/seededRNG.js";
import {
  DURATIONS,
  NOTE_COUNTS,
  SAMPLE_RATES,
  SCALES,
} from "../constants/musicConstants.js";
import type { Song } from "../types/Song.js";

class MusicService {
  async createAllSongs(seed: string, page: number, songs: Song[]) {
    const songsWithMusic = [];
    for (const song of songs) {
      const songSeed = getSongSeed(seed, page, song.id);
      const rng = new SeededRNG(songSeed.toString());
      const notes = this.generateNotes(rng);
      const sampleRate = rng.choice(SAMPLE_RATES);
      const pcm = this.synthesizeNotes(notes, sampleRate);
      song.music = await this.pcmToWavBase64(pcm, sampleRate);
      songsWithMusic.push(song);
    }
    return songsWithMusic;
  }

  generateNotes(rng: SeededRNG) {
    const melody = [];
    const length = rng.choice(NOTE_COUNTS);
    for (let i = 0; i < length; i++) {
      const freq = rng.choice(SCALES);
      const duration = rng.choice(DURATIONS);
      melody.push({
        freq: freq,
        duration,
      });
    }
    return melody;
  }

  private synthesizeNotes(
    melody: {
      freq: number;
      duration: number;
    }[],
    sampleRate = 44100,
  ) {
    let allSamples = [];

    for (let note of melody) {
      const noteSamples = tonegenerator({
        freq: note.freq,
        lengthInSecs: note.duration,
        sampleRate,
        amplitude: 0.5,
        waveType: "sine",
      });
      allSamples.push(Float32Array.from(noteSamples));
    }

    const totalLength = allSamples.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Float32Array(totalLength);
    let offset = 0;
    for (let arr of allSamples) {
      result.set(arr, offset);
      offset += arr.length;
    }
    return result;
  }

  private async pcmToWavBase64(
    pcmData: Float32Array<ArrayBuffer>,
    sampleRate = 44100,
  ) {
    const audioData = {
      sampleRate,
      channelData: [pcmData],
    };
    const arrayBuffer = await wavEncoder.encode(audioData);
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    return `data:audio/wav;base64,${base64}`;
  }
}

export const musicService = new MusicService();
