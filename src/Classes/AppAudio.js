import { Howl, Howler } from "howler";

Howler.autoUnlock = true;

const defaultOption = {
  preload: true,
};

class AudioGroup {
  constructor(volume) {
    this._list = [];
    this._volume = volume || 1.0;
  }
  add(howl) {
    this._list.push(howl);
    howl.volume(this._volume);
  }
  remove(howl) {
    const index = this._list.indexOf(howl);
    if (index > -1) {
      this._list.splice(index, 1);
      return true;
    } else return false;
  }
  clear() {
    this._list = [];
  }
  volume(amount) {
    this._volume = amount;
    this._list.forEach((howl) => {
      howl.volume(amount);
    });
  }
}

class AppAudio {
  constructor() {
    this._group = {};
  }
  load(options, group) {
    const option = { ...defaultOption, ...options };
    const howl = new Howl(option);
    if (group) {
      if (!this._group[group]) {
        this._group[group] = new AudioGroup(1.0);
        this._group[group].add(howl);
      }
    }
    return howl;
  }
  loadAsync(options, group) {
    return new Promise((resolve, reject) => {
      const howl = this.load(options, group);
      if (howl.state() === "loaded") {
        resolve(howl);
      } else {
        howl.once("load", () => {
          resolve(howl);
        });
        howl.once("loaderror", () => {
          reject({ error: "CANNOT_LOAD_SOUND" });
        });
      }
    });
  }
  volume(group, amount) {
    if (this._group[group]) this._group[group].volume(amount);
  }
}

export default AppAudio;
