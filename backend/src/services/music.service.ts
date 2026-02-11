import { Synth, MonoSynth, OfflineContext } from "tone";
import lamejs from "lamejs";

import {
  BASS_DURATION,
  BASS_SCALES,
  DURATION,
  LENGTHS,
  NOTE_FREQUENCIES,
  SCALES,
} from "~/constants/musicConstants.js";

import { getSongSeed } from "~/utils/getSongSeed.js";
import { SeededRNG } from "~/utils/seededRNG.js";
import type { Song } from "~/types/Song.js";

class MusicService {
  async createAllSongs(seed: string, page: number, songs: Song[]) {
    try {
      return Promise.all(
        songs.map((song) => this.generateSong(seed, page, song)),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async generateSong(seed: string, page: number, song: Song) {
    try {
      const melody = this.generateMelody(seed, page, song.id);
      const bass = this.generateBass(seed, page, song.id);

      const renderedBuffer = await this.renderSong(melody, bass, 120);

      const mp3Buffer = this.audioBufferToMp3(renderedBuffer);

      const base64Audio = mp3Buffer.toString("base64");

      return {
        ...song,
        audio: `data:audio/mpeg;base64,${base64Audio}`,
      };
    } catch (err) {
      console.log(err);
    }
  }

  /* =======================================================
     MELODY GENERATION (DETERMINISTIC)
  ======================================================= */

  generateMelody(seed: string, page: number, index: number) {
    const songSeed = getSongSeed(seed, page, index - 1);
    const rng = new SeededRNG(songSeed.toString());

    const melody = [];
    const length = rng.choice(LENGTHS);

    for (let i = 0; i < length; i++) {
      const note = rng.choice(SCALES);
      const duration = rng.choice(DURATION);
      melody.push({ note, duration });
    }

    return melody;
  }

  generateBass(seed: string, page: number, index: number) {
    const songSeed = getSongSeed(seed, page, index - 1);
    const rng = new SeededRNG("bass_" + songSeed.toString());

    const bass = [];
    const length = rng.choice(LENGTHS);

    for (let i = 0; i < length; i++) {
      const note = rng.choice(BASS_SCALES);
      const duration = rng.choice(BASS_DURATION);
      bass.push({ note, duration });
    }

    return bass;
  }

  /* =======================================================
     OFFLINE RENDER (SERVER SIDE)
  ======================================================= */

  async renderSong(melody: any[], bass: any[], tempo = 120) {
    const secondsPerBeat = 60 / tempo;

    const melodyDuration = melody.reduce(
      (sum, n) => sum + n.duration * secondsPerBeat,
      0,
    );

    const bassDuration = bass.reduce(
      (sum, n) => sum + n.duration * secondsPerBeat,
      0,
    );

    const totalDuration = Math.max(melodyDuration, bassDuration);

    const sampleRate = 44100;

    const offline = new OfflineContext(
      2,
      totalDuration * sampleRate,
      sampleRate,
    );

    const synthMelody = new Synth().connect(offline.destination);
    const synthBass = new MonoSynth().connect(offline.destination);

    let currentTime = 0;
    melody.forEach((n) => {
      synthMelody.triggerAttackRelease(
        NOTE_FREQUENCIES[n.note],
        n.duration * secondsPerBeat,
        currentTime,
      );
      currentTime += n.duration * secondsPerBeat;
    });

    currentTime = 0;
    bass.forEach((n) => {
      synthBass.triggerAttackRelease(
        NOTE_FREQUENCIES[n.note],
        n.duration * secondsPerBeat,
        currentTime,
      );
      currentTime += n.duration * secondsPerBeat;
    });

    return await offline.render(); // AudioBuffer
  }

  /* =======================================================
     MP3 ENCODING (BUFFER ONLY, NO FILES)
  ======================================================= */

  audioBufferToMp3(audioBuffer: AudioBuffer): Buffer {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;

    const mp3Encoder = new lamejs.Mp3Encoder(
      numChannels,
      sampleRate,
      128, // kbps
    );

    const left = audioBuffer.getChannelData(0);
    const right =
      numChannels > 1
        ? audioBuffer.getChannelData(1)
        : audioBuffer.getChannelData(0);

    const blockSize = 1152;
    const mp3Data: Uint8Array[] = [];

    for (let i = 0; i < left.length; i += blockSize) {
      const leftChunk = left.subarray(i, i + blockSize);
      const rightChunk = right.subarray(i, i + blockSize);

      const leftInt16 = this.floatTo16BitPCM(leftChunk);
      const rightInt16 = this.floatTo16BitPCM(rightChunk);

      const mp3buf = mp3Encoder.encodeBuffer(leftInt16, rightInt16);

      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }

    const flushData = mp3Encoder.flush();
    if (flushData.length > 0) {
      mp3Data.push(flushData);
    }

    return Buffer.concat(mp3Data.map((b) => Buffer.from(b)));
  }

  floatTo16BitPCM(float32Array: Float32Array): Int16Array {
    const buffer = new Int16Array(float32Array.length);

    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      buffer[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    return buffer;
  }
}

export const musicService = new MusicService();
