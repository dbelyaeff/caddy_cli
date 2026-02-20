#!/usr/bin/env bun
// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/sisteransi/src/index.js
var require_src = __commonJS((exports, module) => {
  var ESC = "\x1B";
  var CSI = `${ESC}[`;
  var beep = "\x07";
  var cursor = {
    to(x, y) {
      if (!y)
        return `${CSI}${x + 1}G`;
      return `${CSI}${y + 1};${x + 1}H`;
    },
    move(x, y) {
      let ret = "";
      if (x < 0)
        ret += `${CSI}${-x}D`;
      else if (x > 0)
        ret += `${CSI}${x}C`;
      if (y < 0)
        ret += `${CSI}${-y}A`;
      else if (y > 0)
        ret += `${CSI}${y}B`;
      return ret;
    },
    up: (count = 1) => `${CSI}${count}A`,
    down: (count = 1) => `${CSI}${count}B`,
    forward: (count = 1) => `${CSI}${count}C`,
    backward: (count = 1) => `${CSI}${count}D`,
    nextLine: (count = 1) => `${CSI}E`.repeat(count),
    prevLine: (count = 1) => `${CSI}F`.repeat(count),
    left: `${CSI}G`,
    hide: `${CSI}?25l`,
    show: `${CSI}?25h`,
    save: `${ESC}7`,
    restore: `${ESC}8`
  };
  var scroll = {
    up: (count = 1) => `${CSI}S`.repeat(count),
    down: (count = 1) => `${CSI}T`.repeat(count)
  };
  var erase = {
    screen: `${CSI}2J`,
    up: (count = 1) => `${CSI}1J`.repeat(count),
    down: (count = 1) => `${CSI}J`.repeat(count),
    line: `${CSI}2K`,
    lineEnd: `${CSI}K`,
    lineStart: `${CSI}1K`,
    lines(count) {
      let clear = "";
      for (let i = 0;i < count; i++)
        clear += this.line + (i < count - 1 ? cursor.up() : "");
      if (count)
        clear += cursor.left;
      return clear;
    }
  };
  module.exports = { cursor, scroll, erase, beep };
});

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS((exports, module) => {
  var p = process || {};
  var argv = p.argv || [];
  var env = p.env || {};
  var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
  var formatter = (open, close, replace = open) => (input) => {
    let string = "" + input, index = string.indexOf(close, open.length);
    return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
  };
  var replaceClose = (string, close, replace, index) => {
    let result = "", cursor = 0;
    do {
      result += string.substring(cursor, index) + replace;
      cursor = index + close.length;
      index = string.indexOf(close, cursor);
    } while (~index);
    return result + string.substring(cursor);
  };
  var createColors = (enabled = isColorSupported) => {
    let f = enabled ? formatter : () => String;
    return {
      isColorSupported: enabled,
      reset: f("\x1B[0m", "\x1B[0m"),
      bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: f("\x1B[3m", "\x1B[23m"),
      underline: f("\x1B[4m", "\x1B[24m"),
      inverse: f("\x1B[7m", "\x1B[27m"),
      hidden: f("\x1B[8m", "\x1B[28m"),
      strikethrough: f("\x1B[9m", "\x1B[29m"),
      black: f("\x1B[30m", "\x1B[39m"),
      red: f("\x1B[31m", "\x1B[39m"),
      green: f("\x1B[32m", "\x1B[39m"),
      yellow: f("\x1B[33m", "\x1B[39m"),
      blue: f("\x1B[34m", "\x1B[39m"),
      magenta: f("\x1B[35m", "\x1B[39m"),
      cyan: f("\x1B[36m", "\x1B[39m"),
      white: f("\x1B[37m", "\x1B[39m"),
      gray: f("\x1B[90m", "\x1B[39m"),
      bgBlack: f("\x1B[40m", "\x1B[49m"),
      bgRed: f("\x1B[41m", "\x1B[49m"),
      bgGreen: f("\x1B[42m", "\x1B[49m"),
      bgYellow: f("\x1B[43m", "\x1B[49m"),
      bgBlue: f("\x1B[44m", "\x1B[49m"),
      bgMagenta: f("\x1B[45m", "\x1B[49m"),
      bgCyan: f("\x1B[46m", "\x1B[49m"),
      bgWhite: f("\x1B[47m", "\x1B[49m"),
      blackBright: f("\x1B[90m", "\x1B[39m"),
      redBright: f("\x1B[91m", "\x1B[39m"),
      greenBright: f("\x1B[92m", "\x1B[39m"),
      yellowBright: f("\x1B[93m", "\x1B[39m"),
      blueBright: f("\x1B[94m", "\x1B[39m"),
      magentaBright: f("\x1B[95m", "\x1B[39m"),
      cyanBright: f("\x1B[96m", "\x1B[39m"),
      whiteBright: f("\x1B[97m", "\x1B[39m"),
      bgBlackBright: f("\x1B[100m", "\x1B[49m"),
      bgRedBright: f("\x1B[101m", "\x1B[49m"),
      bgGreenBright: f("\x1B[102m", "\x1B[49m"),
      bgYellowBright: f("\x1B[103m", "\x1B[49m"),
      bgBlueBright: f("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
      bgCyanBright: f("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: f("\x1B[107m", "\x1B[49m")
    };
  };
  module.exports = createColors();
  module.exports.createColors = createColors;
});

// node_modules/@clack/core/dist/index.mjs
import { stdin as $, stdout as k } from "process";
import * as f from "readline";
import _ from "readline";
import { WriteStream as U } from "tty";
function q({ onlyFirst: e = false } = {}) {
  const F = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(F, e ? undefined : "g");
}
function S(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  return e.replace(J, "");
}
function T(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function A(e, u = {}) {
  if (typeof e != "string" || e.length === 0 || (u = { ambiguousIsNarrow: true, ...u }, e = S(e), e.length === 0))
    return 0;
  e = e.replace(uD(), "  ");
  const F = u.ambiguousIsNarrow ? 1 : 2;
  let t = 0;
  for (const s of e) {
    const C = s.codePointAt(0);
    if (C <= 31 || C >= 127 && C <= 159 || C >= 768 && C <= 879)
      continue;
    switch (X.eastAsianWidth(s)) {
      case "F":
      case "W":
        t += 2;
        break;
      case "A":
        t += F;
        break;
      default:
        t += 1;
    }
  }
  return t;
}
function tD() {
  const e = new Map;
  for (const [u, F] of Object.entries(r)) {
    for (const [t, s] of Object.entries(F))
      r[t] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, F[t] = r[t], e.set(s[0], s[1]);
    Object.defineProperty(r, u, { value: F, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: e, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = M(), r.color.ansi256 = P(), r.color.ansi16m = W(), r.bgColor.ansi = M(d), r.bgColor.ansi256 = P(d), r.bgColor.ansi16m = W(d), Object.defineProperties(r, { rgbToAnsi256: { value: (u, F, t) => u === F && F === t ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(t / 255 * 5), enumerable: false }, hexToRgb: { value: (u) => {
    const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
    if (!F)
      return [0, 0, 0];
    let [t] = F;
    t.length === 3 && (t = [...t].map((C) => C + C).join(""));
    const s = Number.parseInt(t, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u) => r.rgbToAnsi256(...r.hexToRgb(u)), enumerable: false }, ansi256ToAnsi: { value: (u) => {
    if (u < 8)
      return 30 + u;
    if (u < 16)
      return 90 + (u - 8);
    let F, t, s;
    if (u >= 232)
      F = ((u - 232) * 10 + 8) / 255, t = F, s = F;
    else {
      u -= 16;
      const i = u % 36;
      F = Math.floor(u / 36) / 5, t = Math.floor(i / 6) / 5, s = i % 6 / 5;
    }
    const C = Math.max(F, t, s) * 2;
    if (C === 0)
      return 30;
    let D = 30 + (Math.round(s) << 2 | Math.round(t) << 1 | Math.round(F));
    return C === 2 && (D += 60), D;
  }, enumerable: false }, rgbToAnsi: { value: (u, F, t) => r.ansi256ToAnsi(r.rgbToAnsi256(u, F, t)), enumerable: false }, hexToAnsi: { value: (u) => r.ansi256ToAnsi(r.hexToAnsi256(u)), enumerable: false } }), r;
}
function R(e, u, F) {
  return String(e).normalize().replace(/\r\n/g, `
`).split(`
`).map((t) => oD(t, u, F)).join(`
`);
}
function hD(e, u) {
  if (e === u)
    return;
  const F = e.split(`
`), t = u.split(`
`), s = [];
  for (let C = 0;C < Math.max(F.length, t.length); C++)
    F[C] !== t[C] && s.push(C);
  return s;
}
function lD(e) {
  return e === V;
}
function v(e, u) {
  e.isTTY && e.setRawMode(u);
}

class x {
  constructor({ render: u, input: F = $, output: t = k, ...s }, C = true) {
    a(this, "input"), a(this, "output"), a(this, "rl"), a(this, "opts"), a(this, "_track", false), a(this, "_render"), a(this, "_cursor", 0), a(this, "state", "initial"), a(this, "value"), a(this, "error", ""), a(this, "subscribers", new Map), a(this, "_prevFrame", ""), this.opts = s, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C, this.input = F, this.output = t;
  }
  prompt() {
    const u = new U(0);
    return u._write = (F, t, s) => {
      this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s();
    }, this.input.pipe(u), this.rl = _.createInterface({ input: this.input, output: u, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), _.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== undefined && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), v(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F, t) => {
      this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(V);
      });
    });
  }
  on(u, F) {
    const t = this.subscribers.get(u) ?? [];
    t.push({ cb: F }), this.subscribers.set(u, t);
  }
  once(u, F) {
    const t = this.subscribers.get(u) ?? [];
    t.push({ cb: F, once: true }), this.subscribers.set(u, t);
  }
  emit(u, ...F) {
    const t = this.subscribers.get(u) ?? [], s = [];
    for (const C of t)
      C.cb(...F), C.once && s.push(() => t.splice(t.indexOf(C), 1));
    for (const C of s)
      C();
  }
  unsubscribe() {
    this.subscribers.clear();
  }
  onKeypress(u, F) {
    if (this.state === "error" && (this.state = "active"), F?.name && !this._track && z.has(F.name) && this.emit("cursor", z.get(F.name)), F?.name && xD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u === "\t" && this.opts.placeholder && (this.value || (this.rl.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u && this.emit("key", u.toLowerCase()), F?.name === "return") {
      if (this.opts.validate) {
        const t = this.opts.validate(this.value);
        t && (this.error = t, this.state = "error", this.rl.write(this.value));
      }
      this.state !== "error" && (this.state = "submit");
    }
    u === "\x03" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), v(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const u = R(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, u * -1));
  }
  render() {
    const u = R(this._render(this) ?? "", process.stdout.columns, { hard: true });
    if (u !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const F = hD(this._prevFrame, u);
        if (this.restoreCursor(), F && F?.length === 1) {
          const t = F[0];
          this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.lines(1));
          const s = u.split(`
`);
          this.output.write(s[t]), this._prevFrame = u, this.output.write(import_sisteransi.cursor.move(0, s.length - t - 1));
          return;
        } else if (F && F?.length > 1) {
          const t = F[0];
          this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.down());
          const s = u.split(`
`).slice(t);
          this.output.write(s.join(`
`)), this._prevFrame = u;
          return;
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
    }
  }
}
function OD({ input: e = $, output: u = k, overwrite: F = true, hideCursor: t = true } = {}) {
  const s = f.createInterface({ input: e, output: u, prompt: "", tabSize: 1 });
  f.emitKeypressEvents(e, s), e.isTTY && e.setRawMode(true);
  const C = (D, { name: i }) => {
    if (String(D) === "\x03") {
      t && u.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!F)
      return;
    let n = i === "return" ? 0 : -1, E = i === "return" ? -1 : 0;
    f.moveCursor(u, n, E, () => {
      f.clearLine(u, 1, () => {
        e.once("keypress", C);
      });
    });
  };
  return t && u.write(import_sisteransi.cursor.hide), e.once("keypress", C), () => {
    e.off("keypress", C), t && u.write(import_sisteransi.cursor.show), e.isTTY && !WD && e.setRawMode(false), s.terminal = false, s.close();
  };
}
var import_sisteransi, import_picocolors, J, j, Q, X, DD = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
}, uD, d = 10, M = (e = 0) => (u) => `\x1B[${u + e}m`, P = (e = 0) => (u) => `\x1B[${38 + e};5;${u}m`, W = (e = 0) => (u, F, t) => `\x1B[${38 + e};2;${u};${F};${t}m`, r, FD, eD, sD, g, CD = 39, b = "\x07", O = "[", iD = "]", I = "m", w, N = (e) => `${g.values().next().value}${O}${e}${I}`, L = (e) => `${g.values().next().value}${w}${e}${b}`, rD = (e) => e.split(" ").map((u) => A(u)), y = (e, u, F) => {
  const t = [...u];
  let s = false, C = false, D = A(S(e[e.length - 1]));
  for (const [i, n] of t.entries()) {
    const E = A(n);
    if (D + E <= F ? e[e.length - 1] += n : (e.push(n), D = 0), g.has(n) && (s = true, C = t.slice(i + 1).join("").startsWith(w)), s) {
      C ? n === b && (s = false, C = false) : n === I && (s = false);
      continue;
    }
    D += E, D === F && i < t.length - 1 && (e.push(""), D = 0);
  }
  !D && e[e.length - 1].length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
}, ED = (e) => {
  const u = e.split(" ");
  let F = u.length;
  for (;F > 0 && !(A(u[F - 1]) > 0); )
    F--;
  return F === u.length ? e : u.slice(0, F).join(" ") + u.slice(F).join("");
}, oD = (e, u, F = {}) => {
  if (F.trim !== false && e.trim() === "")
    return "";
  let t = "", s, C;
  const D = rD(e);
  let i = [""];
  for (const [E, h] of e.split(" ").entries()) {
    F.trim !== false && (i[i.length - 1] = i[i.length - 1].trimStart());
    let o = A(i[i.length - 1]);
    if (E !== 0 && (o >= u && (F.wordWrap === false || F.trim === false) && (i.push(""), o = 0), (o > 0 || F.trim === false) && (i[i.length - 1] += " ", o++)), F.hard && D[E] > u) {
      const B = u - o, p = 1 + Math.floor((D[E] - B - 1) / u);
      Math.floor((D[E] - 1) / u) < p && i.push(""), y(i, h, u);
      continue;
    }
    if (o + D[E] > u && o > 0 && D[E] > 0) {
      if (F.wordWrap === false && o < u) {
        y(i, h, u);
        continue;
      }
      i.push("");
    }
    if (o + D[E] > u && F.wordWrap === false) {
      y(i, h, u);
      continue;
    }
    i[i.length - 1] += h;
  }
  F.trim !== false && (i = i.map((E) => ED(E)));
  const n = [...i.join(`
`)];
  for (const [E, h] of n.entries()) {
    if (t += h, g.has(h)) {
      const { groups: B } = new RegExp(`(?:\\${O}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(n.slice(E).join("")) || { groups: {} };
      if (B.code !== undefined) {
        const p = Number.parseFloat(B.code);
        s = p === CD ? undefined : p;
      } else
        B.uri !== undefined && (C = B.uri.length === 0 ? undefined : B.uri);
    }
    const o = sD.codes.get(Number(s));
    n[E + 1] === `
` ? (C && (t += L("")), s && o && (t += N(o))) : h === `
` && (s && o && (t += N(s)), C && (t += L(C)));
  }
  return t;
}, nD, aD = (e, u, F) => (u in e) ? nD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, a = (e, u, F) => (aD(e, typeof u != "symbol" ? u + "" : u, F), F), V, z, xD, BD, cD, AD = (e, u, F) => (u in e) ? cD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, G = (e, u, F) => (AD(e, typeof u != "symbol" ? u + "" : u, F), F), pD, fD, gD = (e, u, F) => (u in e) ? fD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, K = (e, u, F) => (gD(e, typeof u != "symbol" ? u + "" : u, F), F), vD, mD, dD = (e, u, F) => (u in e) ? mD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, Y = (e, u, F) => (dD(e, typeof u != "symbol" ? u + "" : u, F), F), bD, wD, yD = (e, u, F) => (u in e) ? wD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, Z = (e, u, F) => (yD(e, typeof u != "symbol" ? u + "" : u, F), F), $D, kD, _D = (e, u, F) => (u in e) ? kD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, H = (e, u, F) => (_D(e, typeof u != "symbol" ? u + "" : u, F), F), SD, TD, jD = (e, u, F) => (u in e) ? TD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, MD = (e, u, F) => (jD(e, typeof u != "symbol" ? u + "" : u, F), F), PD, WD;
var init_dist = __esm(() => {
  import_sisteransi = __toESM(require_src(), 1);
  import_picocolors = __toESM(require_picocolors(), 1);
  J = q();
  j = { exports: {} };
  (function(e) {
    var u = {};
    e.exports = u, u.eastAsianWidth = function(t) {
      var s = t.charCodeAt(0), C = t.length == 2 ? t.charCodeAt(1) : 0, D = s;
      return 55296 <= s && s <= 56319 && 56320 <= C && C <= 57343 && (s &= 1023, C &= 1023, D = s << 10 | C, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
    }, u.characterLength = function(t) {
      var s = this.eastAsianWidth(t);
      return s == "F" || s == "W" || s == "A" ? 2 : 1;
    };
    function F(t) {
      return t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
    }
    u.length = function(t) {
      for (var s = F(t), C = 0, D = 0;D < s.length; D++)
        C = C + this.characterLength(s[D]);
      return C;
    }, u.slice = function(t, s, C) {
      textLen = u.length(t), s = s || 0, C = C || 1, s < 0 && (s = textLen + s), C < 0 && (C = textLen + C);
      for (var D = "", i = 0, n = F(t), E = 0;E < n.length; E++) {
        var h = n[E], o = u.length(h);
        if (i >= s - (o == 2 ? 1 : 0))
          if (i + o <= C)
            D += h;
          else
            break;
        i += o;
      }
      return D;
    };
  })(j);
  Q = j.exports;
  X = T(Q);
  uD = T(DD);
  r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
  Object.keys(r.modifier);
  FD = Object.keys(r.color);
  eD = Object.keys(r.bgColor);
  [...FD, ...eD];
  sD = tD();
  g = new Set(["\x1B", "\x9B"]);
  w = `${iD}8;;`;
  nD = Object.defineProperty;
  V = Symbol("clack:cancel");
  z = new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
  xD = new Set(["up", "down", "left", "right", "space", "enter"]);
  BD = class BD extends x {
    get cursor() {
      return this.value ? 0 : 1;
    }
    get _value() {
      return this.cursor === 0;
    }
    constructor(u) {
      super(u, false), this.value = !!u.initialValue, this.on("value", () => {
        this.value = this._value;
      }), this.on("confirm", (F) => {
        this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = F, this.state = "submit", this.close();
      }), this.on("cursor", () => {
        this.value = !this.value;
      });
    }
  };
  cD = Object.defineProperty;
  pD = class pD extends x {
    constructor(u) {
      super(u, false), G(this, "options"), G(this, "cursor", 0);
      const { options: F } = u;
      this.options = Object.entries(F).flatMap(([t, s]) => [{ value: t, group: true, label: t }, ...s.map((C) => ({ ...C, group: t }))]), this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: t }) => t === u.cursorAt), 0), this.on("cursor", (t) => {
        switch (t) {
          case "left":
          case "up":
            this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
            break;
          case "down":
          case "right":
            this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
            break;
          case "space":
            this.toggleValue();
            break;
        }
      });
    }
    getGroupItems(u) {
      return this.options.filter((F) => F.group === u);
    }
    isGroupSelected(u) {
      return this.getGroupItems(u).every((F) => this.value.includes(F.value));
    }
    toggleValue() {
      const u = this.options[this.cursor];
      if (u.group === true) {
        const F = u.value, t = this.getGroupItems(F);
        this.isGroupSelected(F) ? this.value = this.value.filter((s) => t.findIndex((C) => C.value === s) === -1) : this.value = [...this.value, ...t.map((s) => s.value)], this.value = Array.from(new Set(this.value));
      } else {
        const F = this.value.includes(u.value);
        this.value = F ? this.value.filter((t) => t !== u.value) : [...this.value, u.value];
      }
    }
  };
  fD = Object.defineProperty;
  vD = class extends x {
    constructor(u) {
      super(u, false), K(this, "options"), K(this, "cursor", 0), this.options = u.options, this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: F }) => F === u.cursorAt), 0), this.on("key", (F) => {
        F === "a" && this.toggleAll();
      }), this.on("cursor", (F) => {
        switch (F) {
          case "left":
          case "up":
            this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
            break;
          case "down":
          case "right":
            this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
            break;
          case "space":
            this.toggleValue();
            break;
        }
      });
    }
    get _value() {
      return this.options[this.cursor].value;
    }
    toggleAll() {
      const u = this.value.length === this.options.length;
      this.value = u ? [] : this.options.map((F) => F.value);
    }
    toggleValue() {
      const u = this.value.includes(this._value);
      this.value = u ? this.value.filter((F) => F !== this._value) : [...this.value, this._value];
    }
  };
  mD = Object.defineProperty;
  bD = class bD extends x {
    constructor({ mask: u, ...F }) {
      super(F), Y(this, "valueWithCursor", ""), Y(this, "_mask", "\u2022"), this._mask = u ?? "\u2022", this.on("finalize", () => {
        this.valueWithCursor = this.masked;
      }), this.on("value", () => {
        if (this.cursor >= this.value.length)
          this.valueWithCursor = `${this.masked}${import_picocolors.default.inverse(import_picocolors.default.hidden("_"))}`;
        else {
          const t = this.masked.slice(0, this.cursor), s = this.masked.slice(this.cursor);
          this.valueWithCursor = `${t}${import_picocolors.default.inverse(s[0])}${s.slice(1)}`;
        }
      });
    }
    get cursor() {
      return this._cursor;
    }
    get masked() {
      return this.value.replaceAll(/./g, this._mask);
    }
  };
  wD = Object.defineProperty;
  $D = class extends x {
    constructor(u) {
      super(u, false), Z(this, "options"), Z(this, "cursor", 0), this.options = u.options, this.cursor = this.options.findIndex(({ value: F }) => F === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F) => {
        switch (F) {
          case "left":
          case "up":
            this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
            break;
          case "down":
          case "right":
            this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
            break;
        }
        this.changeValue();
      });
    }
    get _value() {
      return this.options[this.cursor];
    }
    changeValue() {
      this.value = this._value.value;
    }
  };
  kD = Object.defineProperty;
  SD = class SD extends x {
    constructor(u) {
      super(u, false), H(this, "options"), H(this, "cursor", 0), this.options = u.options;
      const F = this.options.map(({ value: [t] }) => t?.toLowerCase());
      this.cursor = Math.max(F.indexOf(u.initialValue), 0), this.on("key", (t) => {
        if (!F.includes(t))
          return;
        const s = this.options.find(({ value: [C] }) => C?.toLowerCase() === t);
        s && (this.value = s.value, this.state = "submit", this.emit("submit"));
      });
    }
  };
  TD = Object.defineProperty;
  PD = class PD extends x {
    constructor(u) {
      super(u), MD(this, "valueWithCursor", ""), this.on("finalize", () => {
        this.value || (this.value = u.defaultValue), this.valueWithCursor = this.value;
      }), this.on("value", () => {
        if (this.cursor >= this.value.length)
          this.valueWithCursor = `${this.value}${import_picocolors.default.inverse(import_picocolors.default.hidden("_"))}`;
        else {
          const F = this.value.slice(0, this.cursor), t = this.value.slice(this.cursor);
          this.valueWithCursor = `${F}${import_picocolors.default.inverse(t[0])}${t.slice(1)}`;
        }
      });
    }
    get cursor() {
      return this._cursor;
    }
  };
  WD = globalThis.process.platform.startsWith("win");
});

// node_modules/@clack/prompts/dist/index.mjs
var exports_dist = {};
__export(exports_dist, {
  text: () => te,
  spinner: () => de,
  selectKey: () => ne,
  select: () => ie,
  password: () => re,
  outro: () => $e,
  note: () => le,
  multiselect: () => ae,
  log: () => f2,
  isCancel: () => lD,
  intro: () => oe,
  groupMultiselect: () => ce,
  group: () => he,
  confirm: () => se,
  cancel: () => ue
});
import h from "process";
function q2() {
  return h.platform !== "win32" ? h.env.TERM !== "linux" : Boolean(h.env.CI) || Boolean(h.env.WT_SESSION) || Boolean(h.env.TERMINUS_SUBLIME) || h.env.ConEmuTask === "{cmd::Cmder}" || h.env.TERM_PROGRAM === "Terminus-Sublime" || h.env.TERM_PROGRAM === "vscode" || h.env.TERM === "xterm-256color" || h.env.TERM === "alacritty" || h.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
function me() {
  const r2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(r2, "g");
}
var import_picocolors2, import_sisteransi2, _2, o = (r2, n) => _2 ? r2 : n, H2, I2, x2, S2, K2, a2, d2, b2, E, C, w2, M2, U2, B, Z2, z2, X2, J2, Y2, Q2, ee, y2 = (r2) => {
  switch (r2) {
    case "initial":
    case "active":
      return import_picocolors2.default.cyan(H2);
    case "cancel":
      return import_picocolors2.default.red(I2);
    case "error":
      return import_picocolors2.default.yellow(x2);
    case "submit":
      return import_picocolors2.default.green(S2);
  }
}, te = (r2) => new PD({ validate: r2.validate, placeholder: r2.placeholder, defaultValue: r2.defaultValue, initialValue: r2.initialValue, render() {
  const n = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, i = r2.placeholder ? import_picocolors2.default.inverse(r2.placeholder[0]) + import_picocolors2.default.dim(r2.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), t = this.value ? this.valueWithCursor : i;
  switch (this.state) {
    case "error":
      return `${n.trim()}
${import_picocolors2.default.yellow(a2)}  ${t}
${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(this.error)}
`;
    case "submit":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(this.value || r2.placeholder)}`;
    case "cancel":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(this.value ?? ""))}${this.value?.trim() ? `
` + import_picocolors2.default.gray(a2) : ""}`;
    default:
      return `${n}${import_picocolors2.default.cyan(a2)}  ${t}
${import_picocolors2.default.cyan(d2)}
`;
  }
} }).prompt(), re = (r2) => new bD({ validate: r2.validate, mask: r2.mask ?? U2, render() {
  const n = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, i = this.valueWithCursor, t = this.masked;
  switch (this.state) {
    case "error":
      return `${n.trim()}
${import_picocolors2.default.yellow(a2)}  ${t}
${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(this.error)}
`;
    case "submit":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(t)}`;
    case "cancel":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(t ?? ""))}${t ? `
` + import_picocolors2.default.gray(a2) : ""}`;
    default:
      return `${n}${import_picocolors2.default.cyan(a2)}  ${i}
${import_picocolors2.default.cyan(d2)}
`;
  }
} }).prompt(), se = (r2) => {
  const n = r2.active ?? "Yes", i = r2.inactive ?? "No";
  return new BD({ active: n, inactive: i, initialValue: r2.initialValue ?? true, render() {
    const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`, s = this.value ? n : i;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(s)}`;
      case "cancel":
        return `${t}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s))}
${import_picocolors2.default.gray(a2)}`;
      default:
        return `${t}${import_picocolors2.default.cyan(a2)}  ${this.value ? `${import_picocolors2.default.green(b2)} ${n}` : `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(n)}`} ${import_picocolors2.default.dim("/")} ${this.value ? `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(i)}` : `${import_picocolors2.default.green(b2)} ${i}`}
${import_picocolors2.default.cyan(d2)}
`;
    }
  } }).prompt();
}, ie = (r2) => {
  const n = (t, s) => {
    const c2 = t.label ?? String(t.value);
    return s === "active" ? `${import_picocolors2.default.green(b2)} ${c2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : s === "selected" ? `${import_picocolors2.default.dim(c2)}` : s === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(c2))}` : `${import_picocolors2.default.dim(E)} ${import_picocolors2.default.dim(c2)}`;
  };
  let i = 0;
  return new $D({ options: r2.options, initialValue: r2.initialValue, render() {
    const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[this.cursor], "selected")}`;
      case "cancel":
        return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors2.default.gray(a2)}`;
      default: {
        const s = r2.maxItems === undefined ? 1 / 0 : Math.max(r2.maxItems, 5);
        this.cursor >= i + s - 3 ? i = Math.max(Math.min(this.cursor - s + 3, this.options.length - s), 0) : this.cursor < i + 2 && (i = Math.max(this.cursor - 2, 0));
        const c2 = s < this.options.length && i > 0, l2 = s < this.options.length && i + s < this.options.length;
        return `${t}${import_picocolors2.default.cyan(a2)}  ${this.options.slice(i, i + s).map((u, m2, $2) => m2 === 0 && c2 ? import_picocolors2.default.dim("...") : m2 === $2.length - 1 && l2 ? import_picocolors2.default.dim("...") : n(u, m2 + i === this.cursor ? "active" : "inactive")).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan(d2)}
`;
      }
    }
  } }).prompt();
}, ne = (r2) => {
  const n = (i, t = "inactive") => {
    const s = i.label ?? String(i.value);
    return t === "selected" ? `${import_picocolors2.default.dim(s)}` : t === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s))}` : t === "active" ? `${import_picocolors2.default.bgCyan(import_picocolors2.default.gray(` ${i.value} `))} ${s} ${i.hint ? import_picocolors2.default.dim(`(${i.hint})`) : ""}` : `${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(` ${i.value} `)))} ${s} ${i.hint ? import_picocolors2.default.dim(`(${i.hint})`) : ""}`;
  };
  return new SD({ options: r2.options, initialValue: r2.initialValue, render() {
    const i = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`;
    switch (this.state) {
      case "submit":
        return `${i}${import_picocolors2.default.gray(a2)}  ${n(this.options.find((t) => t.value === this.value), "selected")}`;
      case "cancel":
        return `${i}${import_picocolors2.default.gray(a2)}  ${n(this.options[0], "cancelled")}
${import_picocolors2.default.gray(a2)}`;
      default:
        return `${i}${import_picocolors2.default.cyan(a2)}  ${this.options.map((t, s) => n(t, s === this.cursor ? "active" : "inactive")).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan(d2)}
`;
    }
  } }).prompt();
}, ae = (r2) => {
  const n = (i, t) => {
    const s = i.label ?? String(i.value);
    return t === "active" ? `${import_picocolors2.default.cyan(C)} ${s} ${i.hint ? import_picocolors2.default.dim(`(${i.hint})`) : ""}` : t === "selected" ? `${import_picocolors2.default.green(w2)} ${import_picocolors2.default.dim(s)}` : t === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(s))}` : t === "active-selected" ? `${import_picocolors2.default.green(w2)} ${s} ${i.hint ? import_picocolors2.default.dim(`(${i.hint})`) : ""}` : t === "submitted" ? `${import_picocolors2.default.dim(s)}` : `${import_picocolors2.default.dim(M2)} ${import_picocolors2.default.dim(s)}`;
  };
  return new vD({ options: r2.options, initialValues: r2.initialValues, required: r2.required ?? true, cursorAt: r2.cursorAt, validate(i) {
    if (this.required && i.length === 0)
      return `Please select at least one option.
${import_picocolors2.default.reset(import_picocolors2.default.dim(`Press ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" space ")))} to select, ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" enter ")))} to submit`))}`;
  }, render() {
    let i = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`;
    switch (this.state) {
      case "submit":
        return `${i}${import_picocolors2.default.gray(a2)}  ${this.options.filter(({ value: t }) => this.value.includes(t)).map((t) => n(t, "submitted")).join(import_picocolors2.default.dim(", ")) || import_picocolors2.default.dim("none")}`;
      case "cancel": {
        const t = this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => n(s, "cancelled")).join(import_picocolors2.default.dim(", "));
        return `${i}${import_picocolors2.default.gray(a2)}  ${t.trim() ? `${t}
${import_picocolors2.default.gray(a2)}` : ""}`;
      }
      case "error": {
        const t = this.error.split(`
`).map((s, c2) => c2 === 0 ? `${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(s)}` : `   ${s}`).join(`
`);
        return i + import_picocolors2.default.yellow(a2) + "  " + this.options.map((s, c2) => {
          const l2 = this.value.includes(s.value), u = c2 === this.cursor;
          return u && l2 ? n(s, "active-selected") : l2 ? n(s, "selected") : n(s, u ? "active" : "inactive");
        }).join(`
${import_picocolors2.default.yellow(a2)}  `) + `
` + t + `
`;
      }
      default:
        return `${i}${import_picocolors2.default.cyan(a2)}  ${this.options.map((t, s) => {
          const c2 = this.value.includes(t.value), l2 = s === this.cursor;
          return l2 && c2 ? n(t, "active-selected") : c2 ? n(t, "selected") : n(t, l2 ? "active" : "inactive");
        }).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan(d2)}
`;
    }
  } }).prompt();
}, ce = (r2) => {
  const n = (i, t, s = []) => {
    const c2 = i.label ?? String(i.value), l2 = typeof i.group == "string", u = l2 && (s[s.indexOf(i) + 1] ?? { group: true }), m2 = l2 && u.group === true, $2 = l2 ? `${m2 ? d2 : a2} ` : "";
    return t === "active" ? `${import_picocolors2.default.dim($2)}${import_picocolors2.default.cyan(C)} ${c2} ${i.hint ? import_picocolors2.default.dim(`(${i.hint})`) : ""}` : t === "group-active" ? `${$2}${import_picocolors2.default.cyan(C)} ${import_picocolors2.default.dim(c2)}` : t === "group-active-selected" ? `${$2}${import_picocolors2.default.green(w2)} ${import_picocolors2.default.dim(c2)}` : t === "selected" ? `${import_picocolors2.default.dim($2)}${import_picocolors2.default.green(w2)} ${import_picocolors2.default.dim(c2)}` : t === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(c2))}` : t === "active-selected" ? `${import_picocolors2.default.dim($2)}${import_picocolors2.default.green(w2)} ${c2} ${i.hint ? import_picocolors2.default.dim(`(${i.hint})`) : ""}` : t === "submitted" ? `${import_picocolors2.default.dim(c2)}` : `${import_picocolors2.default.dim($2)}${import_picocolors2.default.dim(M2)} ${import_picocolors2.default.dim(c2)}`;
  };
  return new pD({ options: r2.options, initialValues: r2.initialValues, required: r2.required ?? true, cursorAt: r2.cursorAt, validate(i) {
    if (this.required && i.length === 0)
      return `Please select at least one option.
${import_picocolors2.default.reset(import_picocolors2.default.dim(`Press ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" space ")))} to select, ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" enter ")))} to submit`))}`;
  }, render() {
    let i = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${r2.message}
`;
    switch (this.state) {
      case "submit":
        return `${i}${import_picocolors2.default.gray(a2)}  ${this.options.filter(({ value: t }) => this.value.includes(t)).map((t) => n(t, "submitted")).join(import_picocolors2.default.dim(", "))}`;
      case "cancel": {
        const t = this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => n(s, "cancelled")).join(import_picocolors2.default.dim(", "));
        return `${i}${import_picocolors2.default.gray(a2)}  ${t.trim() ? `${t}
${import_picocolors2.default.gray(a2)}` : ""}`;
      }
      case "error": {
        const t = this.error.split(`
`).map((s, c2) => c2 === 0 ? `${import_picocolors2.default.yellow(d2)}  ${import_picocolors2.default.yellow(s)}` : `   ${s}`).join(`
`);
        return `${i}${import_picocolors2.default.yellow(a2)}  ${this.options.map((s, c2, l2) => {
          const u = this.value.includes(s.value) || s.group === true && this.isGroupSelected(`${s.value}`), m2 = c2 === this.cursor;
          return !m2 && typeof s.group == "string" && this.options[this.cursor].value === s.group ? n(s, u ? "group-active-selected" : "group-active", l2) : m2 && u ? n(s, "active-selected", l2) : u ? n(s, "selected", l2) : n(s, m2 ? "active" : "inactive", l2);
        }).join(`
${import_picocolors2.default.yellow(a2)}  `)}
${t}
`;
      }
      default:
        return `${i}${import_picocolors2.default.cyan(a2)}  ${this.options.map((t, s, c2) => {
          const l2 = this.value.includes(t.value) || t.group === true && this.isGroupSelected(`${t.value}`), u = s === this.cursor;
          return !u && typeof t.group == "string" && this.options[this.cursor].value === t.group ? n(t, l2 ? "group-active-selected" : "group-active", c2) : u && l2 ? n(t, "active-selected", c2) : l2 ? n(t, "selected", c2) : n(t, u ? "active" : "inactive", c2);
        }).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan(d2)}
`;
    }
  } }).prompt();
}, R2 = (r2) => r2.replace(me(), ""), le = (r2 = "", n = "") => {
  const i = `
${r2}
`.split(`
`), t = R2(n).length, s = Math.max(i.reduce((l2, u) => (u = R2(u), u.length > l2 ? u.length : l2), 0), t) + 2, c2 = i.map((l2) => `${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(l2)}${" ".repeat(s - R2(l2).length)}${import_picocolors2.default.gray(a2)}`).join(`
`);
  process.stdout.write(`${import_picocolors2.default.gray(a2)}
${import_picocolors2.default.green(S2)}  ${import_picocolors2.default.reset(n)} ${import_picocolors2.default.gray(B.repeat(Math.max(s - t - 1, 1)) + Z2)}
${c2}
${import_picocolors2.default.gray(z2 + B.repeat(s + 2) + X2)}
`);
}, ue = (r2 = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(d2)}  ${import_picocolors2.default.red(r2)}

`);
}, oe = (r2 = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(K2)}  ${r2}
`);
}, $e = (r2 = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(a2)}
${import_picocolors2.default.gray(d2)}  ${r2}

`);
}, f2, de = () => {
  const r2 = _2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], n = _2 ? 80 : 120;
  let i, t, s = false, c2 = "";
  const l2 = (v2 = "") => {
    s = true, i = OD(), c2 = v2.replace(/\.+$/, ""), process.stdout.write(`${import_picocolors2.default.gray(a2)}
`);
    let g2 = 0, p = 0;
    t = setInterval(() => {
      const O2 = import_picocolors2.default.magenta(r2[g2]), P2 = ".".repeat(Math.floor(p)).slice(0, 3);
      process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${O2}  ${c2}${P2}`), g2 = g2 + 1 < r2.length ? g2 + 1 : 0, p = p < r2.length ? p + 0.125 : 0;
    }, n);
  }, u = (v2 = "", g2 = 0) => {
    c2 = v2 ?? c2, s = false, clearInterval(t);
    const p = g2 === 0 ? import_picocolors2.default.green(S2) : g2 === 1 ? import_picocolors2.default.red(I2) : import_picocolors2.default.red(x2);
    process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${p}  ${c2}
`), i();
  }, m2 = (v2 = "") => {
    c2 = v2 ?? c2;
  }, $2 = (v2) => {
    const g2 = v2 > 1 ? "Something went wrong" : "Canceled";
    s && u(g2, v2);
  };
  return process.on("uncaughtExceptionMonitor", () => $2(2)), process.on("unhandledRejection", () => $2(2)), process.on("SIGINT", () => $2(1)), process.on("SIGTERM", () => $2(1)), process.on("exit", $2), { start: l2, stop: u, message: m2 };
}, he = async (r2, n) => {
  const i = {}, t = Object.keys(r2);
  for (const s of t) {
    const c2 = r2[s], l2 = await c2({ results: i })?.catch((u) => {
      throw u;
    });
    if (typeof n?.onCancel == "function" && lD(l2)) {
      i[s] = "canceled", n.onCancel({ results: i });
      continue;
    }
    i[s] = l2;
  }
  return i;
};
var init_dist2 = __esm(() => {
  init_dist();
  init_dist();
  import_picocolors2 = __toESM(require_picocolors(), 1);
  import_sisteransi2 = __toESM(require_src(), 1);
  _2 = q2();
  H2 = o("\u25C6", "*");
  I2 = o("\u25A0", "x");
  x2 = o("\u25B2", "x");
  S2 = o("\u25C7", "o");
  K2 = o("\u250C", "T");
  a2 = o("\u2502", "|");
  d2 = o("\u2514", "\u2014");
  b2 = o("\u25CF", ">");
  E = o("\u25CB", " ");
  C = o("\u25FB", "[\u2022]");
  w2 = o("\u25FC", "[+]");
  M2 = o("\u25FB", "[ ]");
  U2 = o("\u25AA", "\u2022");
  B = o("\u2500", "-");
  Z2 = o("\u256E", "+");
  z2 = o("\u251C", "+");
  X2 = o("\u256F", "+");
  J2 = o("\u25CF", "\u2022");
  Y2 = o("\u25C6", "*");
  Q2 = o("\u25B2", "!");
  ee = o("\u25A0", "x");
  f2 = { message: (r2 = "", { symbol: n = import_picocolors2.default.gray(a2) } = {}) => {
    const i = [`${import_picocolors2.default.gray(a2)}`];
    if (r2) {
      const [t, ...s] = r2.split(`
`);
      i.push(`${n}  ${t}`, ...s.map((c2) => `${import_picocolors2.default.gray(a2)}  ${c2}`));
    }
    process.stdout.write(`${i.join(`
`)}
`);
  }, info: (r2) => {
    f2.message(r2, { symbol: import_picocolors2.default.blue(J2) });
  }, success: (r2) => {
    f2.message(r2, { symbol: import_picocolors2.default.green(Y2) });
  }, step: (r2) => {
    f2.message(r2, { symbol: import_picocolors2.default.green(S2) });
  }, warn: (r2) => {
    f2.message(r2, { symbol: import_picocolors2.default.yellow(Q2) });
  }, warning: (r2) => {
    f2.warn(r2);
  }, error: (r2) => {
    f2.message(r2, { symbol: import_picocolors2.default.red(ee) });
  } };
});

// src/main.ts
import { existsSync as existsSync3 } from "fs";

// src/docker.ts
async function runDockerCommand(args) {
  try {
    const proc = Bun.spawn(["docker", ...args]);
    const output = await new Response(proc.stdout).text();
    await proc.exited;
    const exitCode = proc.exitCode;
    if (exitCode !== 0) {
      return "";
    }
    return output;
  } catch {
    return "";
  }
}
async function getAllContainers() {
  try {
    const output = await runDockerCommand([
      "ps",
      "--filter",
      "network=caddy",
      "--format",
      "{{.Names}}"
    ]);
    if (!output.trim()) {
      return [];
    }
    const containers = [];
    const containerNames = output.trim().split(`
`);
    for (const containerName of containerNames) {
      const name = containerName.trim();
      if (!name || name.includes("caddy"))
        continue;
      const inspectOutput = await runDockerCommand([
        "inspect",
        name,
        "--format",
        "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}"
      ]);
      const ip = inspectOutput.trim();
      if (!ip)
        continue;
      const portsJson = await runDockerCommand([
        "inspect",
        name,
        "--format",
        "{{json .NetworkSettings.Ports}}"
      ]);
      const portsObj = JSON.parse(portsJson || "{}");
      const ports = [];
      for (const [containerPort, bindings] of Object.entries(portsObj)) {
        if (bindings && Array.isArray(bindings) && bindings.length > 0) {
          ports.push(containerPort.split("/")[0]);
        }
      }
      containers.push({
        name,
        ip,
        ports
      });
    }
    return containers;
  } catch {
    return [];
  }
}
async function reloadCaddy() {
  try {
    const output = await runDockerCommand([
      "ps",
      "--filter",
      "name=caddy",
      "--filter",
      "status=running",
      "--format",
      "{{.Names}}"
    ]);
    const containerName = output.trim().split(`
`)[0];
    if (!containerName) {
      return false;
    }
    const proc = Bun.spawn(["docker", "exec", containerName, "caddy", "reload", "--config", "/etc/caddy/Caddyfile"]);
    await proc.exited;
    const exitCode = proc.exitCode;
    return exitCode === 0;
  } catch {
    return false;
  }
}

// src/caddyfile.ts
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
var caddyBasePath = "../caddy";
var caddyPathLoaded = false;
function setCaddyPath(path) {
  caddyBasePath = path;
  caddyPathLoaded = true;
}
function getCaddyfilePath() {
  return `${caddyBasePath}/config/Caddyfile`;
}
function parseCaddyfile(content) {
  const sites = [];
  const lines = content.split(`
`);
  let currentDomain = "";
  let inSiteBlock = false;
  let braceCount = 0;
  for (let i = 0;i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#") || line.startsWith("//"))
      continue;
    if (line.startsWith("{") && !inSiteBlock)
      continue;
    if (line.startsWith("("))
      continue;
    if (inSiteBlock) {
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;
      const reverseProxyMatch = line.match(/reverse_proxy\s+(?:\*\s+)?(\S+)(?::(\d+))?/);
      if (reverseProxyMatch) {
        sites.push({
          domain: currentDomain,
          container_name: reverseProxyMatch[1],
          container_port: reverseProxyMatch[2] || ""
        });
      }
      if (braceCount <= 0) {
        inSiteBlock = false;
        currentDomain = "";
        braceCount = 0;
      }
    } else {
      if (!line.includes("{") && !line.includes("}") && !line.startsWith("import") && !line.startsWith("header") && !line.startsWith("log") && !line.startsWith("encode") && !line.startsWith("root") && !line.startsWith("file_server")) {
        currentDomain = line;
        inSiteBlock = true;
        braceCount = 1;
      } else if (line.includes("{")) {
        currentDomain = line.replace("{", "").trim();
        inSiteBlock = true;
        braceCount = 1;
      }
    }
  }
  return sites;
}
async function readCaddyfile() {
  const path = getCaddyfilePath();
  if (!existsSync(path)) {
    throw new Error(`Caddyfile not found at ${path}`);
  }
  return readFile(path, "utf-8");
}
async function getSites() {
  const content = await readCaddyfile();
  return parseCaddyfile(content);
}
function generateCaddyfile(sites, existingContent) {
  const globalBlocks = extractGlobalBlocks(existingContent);
  const hasSharedSnippets = globalBlocks.sharedBlocks.includes("(shared)");
  let result = "";
  result += globalBlocks.global + `
`;
  if (hasSharedSnippets) {
    result += globalBlocks.sharedBlocks + `
`;
    result += globalBlocks.mustHeadersBlock + `

`;
  }
  for (const site of sites) {
    const port = site.container_port ? `:${site.container_port}` : "";
    result += `${site.domain} {
`;
    if (hasSharedSnippets) {
      result += `	import shared ${site.domain}
`;
    } else {
      result += `	encode zstd gzip
`;
    }
    result += `	reverse_proxy ${site.container_name}${port}
`;
    result += `}

`;
  }
  return result;
}
function extractGlobalBlocks(content) {
  const lines = content.split(`
`);
  let global = "";
  let sharedBlocks = "";
  let mustHeadersBlock = "";
  let inGlobalBlock = false;
  let inSharedBlock = false;
  let braceCount = 0;
  let currentBlock = "";
  for (let i = 0;i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith("{") && !inGlobalBlock && !inSharedBlock && trimmed === "{") {
      inGlobalBlock = true;
      braceCount = 1;
      currentBlock = "global";
      global = line + `
`;
      continue;
    }
    if (inGlobalBlock) {
      global += line + `
`;
      braceCount += (trimmed.match(/{/g) || []).length;
      braceCount -= (trimmed.match(/}/g) || []).length;
      if (braceCount <= 0) {
        inGlobalBlock = false;
      }
      continue;
    }
    if (trimmed.startsWith("(shared)")) {
      inSharedBlock = true;
      braceCount = 1;
      currentBlock = "sharedBlocks";
      sharedBlocks = "";
      continue;
    }
    if (trimmed.startsWith("(mustheaders)")) {
      inSharedBlock = true;
      braceCount = 1;
      currentBlock = "mustHeadersBlock";
      mustHeadersBlock = "";
      continue;
    }
    if (inSharedBlock) {
      if (currentBlock === "sharedBlocks") {
        sharedBlocks += line + `
`;
      } else {
        mustHeadersBlock += line + `
`;
      }
      braceCount += (trimmed.match(/{/g) || []).length;
      braceCount -= (trimmed.match(/}/g) || []).length;
      if (braceCount <= 0) {
        inSharedBlock = false;
      }
      continue;
    }
  }
  return { global, sharedBlocks, mustHeadersBlock };
}
async function saveSites(sites) {
  const content = await readCaddyfile();
  const newContent = generateCaddyfile(sites, content);
  await writeCaddyfile(newContent);
}
async function writeCaddyfile(content) {
  const path = getCaddyfilePath();
  await writeFile(path, content, "utf-8");
}

// node_modules/figlet/dist/node-figlet.mjs
import * as fs from "fs";
import * as path from "path";

// node_modules/figlet/dist/figlet-B0EdFl3_.js
var LAYOUT = {
  FULL_WIDTH: 0,
  FITTING: 1,
  SMUSHING: 2,
  CONTROLLED_SMUSHING: 3
};

class FigletFont {
  constructor() {
    this.comment = "";
    this.numChars = 0;
    this.options = {};
  }
}
var fontList = [
  "1Row",
  "3-D",
  "3D Diagonal",
  "3D-ASCII",
  "3x5",
  "4Max",
  "5 Line Oblique",
  "AMC 3 Line",
  "AMC 3 Liv1",
  "AMC AAA01",
  "AMC Neko",
  "AMC Razor",
  "AMC Razor2",
  "AMC Slash",
  "AMC Slider",
  "AMC Thin",
  "AMC Tubes",
  "AMC Untitled",
  "ANSI Compact",
  "ANSI Regular",
  "ANSI Shadow",
  "ASCII 12",
  "ASCII 9",
  "ASCII New Roman",
  "Acrobatic",
  "Alligator",
  "Alligator2",
  "Alpha",
  "Alphabet",
  "Arrows",
  "Avatar",
  "B1FF",
  "Babyface Lame",
  "Babyface Leet",
  "Banner",
  "Banner3-D",
  "Banner3",
  "Banner4",
  "Barbwire",
  "Basic",
  "Bear",
  "Bell",
  "Benjamin",
  "Big ASCII 12",
  "Big ASCII 9",
  "Big Chief",
  "Big Money-ne",
  "Big Money-nw",
  "Big Money-se",
  "Big Money-sw",
  "Big Mono 12",
  "Big Mono 9",
  "Big",
  "Bigfig",
  "Binary",
  "Block",
  "Blocks",
  "Bloody",
  "BlurVision ASCII",
  "Bolger",
  "Braced",
  "Bright",
  "Broadway KB",
  "Broadway",
  "Bubble",
  "Bulbhead",
  "Caligraphy",
  "Caligraphy2",
  "Calvin S",
  "Cards",
  "Catwalk",
  "Chiseled",
  "Chunky",
  "Circle",
  "Classy",
  "Coder Mini",
  "Coinstak",
  "Cola",
  "Colossal",
  "Computer",
  "Contessa",
  "Contrast",
  "Cosmike",
  "Cosmike2",
  "Crawford",
  "Crawford2",
  "Crazy",
  "Cricket",
  "Cursive",
  "Cyberlarge",
  "Cybermedium",
  "Cybersmall",
  "Cygnet",
  "DANC4",
  "DOS Rebel",
  "DWhistled",
  "Dancing Font",
  "Decimal",
  "Def Leppard",
  "Delta Corps Priest 1",
  "DiamFont",
  "Diamond",
  "Diet Cola",
  "Digital",
  "Doh",
  "Doom",
  "Dot Matrix",
  "Double Shorts",
  "Double",
  "Dr Pepper",
  "Efti Chess",
  "Efti Font",
  "Efti Italic",
  "Efti Piti",
  "Efti Robot",
  "Efti Wall",
  "Efti Water",
  "Electronic",
  "Elite",
  "Emboss 2",
  "Emboss",
  "Epic",
  "Fender",
  "Filter",
  "Fire Font-k",
  "Fire Font-s",
  "Flipped",
  "Flower Power",
  "Font Font",
  "Four Tops",
  "Fraktur",
  "Fun Face",
  "Fun Faces",
  "Future",
  "Fuzzy",
  "Georgi16",
  "Georgia11",
  "Ghost",
  "Ghoulish",
  "Glenyn",
  "Goofy",
  "Gothic",
  "Graceful",
  "Gradient",
  "Graffiti",
  "Greek",
  "Heart Left",
  "Heart Right",
  "Henry 3D",
  "Hex",
  "Hieroglyphs",
  "Hollywood",
  "Horizontal Left",
  "Horizontal Right",
  "ICL-1900",
  "Impossible",
  "Invita",
  "Isometric1",
  "Isometric2",
  "Isometric3",
  "Isometric4",
  "Italic",
  "Ivrit",
  "JS Block Letters",
  "JS Bracket Letters",
  "JS Capital Curves",
  "JS Cursive",
  "JS Stick Letters",
  "Jacky",
  "Jazmine",
  "Jerusalem",
  "Katakana",
  "Kban",
  "Keyboard",
  "Knob",
  "Konto Slant",
  "Konto",
  "LCD",
  "Larry 3D 2",
  "Larry 3D",
  "Lean",
  "Letter",
  "Letters",
  "Lil Devil",
  "Line Blocks",
  "Linux",
  "Lockergnome",
  "Madrid",
  "Marquee",
  "Maxfour",
  "Merlin1",
  "Merlin2",
  "Mike",
  "Mini",
  "Mirror",
  "Mnemonic",
  "Modular",
  "Mono 12",
  "Mono 9",
  "Morse",
  "Morse2",
  "Moscow",
  "Mshebrew210",
  "Muzzle",
  "NScript",
  "NT Greek",
  "NV Script",
  "Nancyj-Fancy",
  "Nancyj-Improved",
  "Nancyj-Underlined",
  "Nancyj",
  "Nipples",
  "O8",
  "OS2",
  "Octal",
  "Ogre",
  "Old Banner",
  "Pagga",
  "Patorjk's Cheese",
  "Patorjk-HeX",
  "Pawp",
  "Peaks Slant",
  "Peaks",
  "Pebbles",
  "Pepper",
  "Poison",
  "Puffy",
  "Puzzle",
  "Pyramid",
  "Rammstein",
  "Rebel",
  "Rectangles",
  "Red Phoenix",
  "Relief",
  "Relief2",
  "Reverse",
  "Roman",
  "Rot13",
  "Rotated",
  "Rounded",
  "Rowan Cap",
  "Rozzo",
  "RubiFont",
  "Runic",
  "Runyc",
  "S Blood",
  "SL Script",
  "Santa Clara",
  "Script",
  "Serifcap",
  "Shaded Blocky",
  "Shadow",
  "Shimrod",
  "Short",
  "Slant Relief",
  "Slant",
  "Slide",
  "Small ASCII 12",
  "Small ASCII 9",
  "Small Block",
  "Small Braille",
  "Small Caps",
  "Small Isometric1",
  "Small Keyboard",
  "Small Mono 12",
  "Small Mono 9",
  "Small Poison",
  "Small Script",
  "Small Shadow",
  "Small Slant",
  "Small Tengwar",
  "Small",
  "Soft",
  "Speed",
  "Spliff",
  "Stacey",
  "Stampate",
  "Stampatello",
  "Standard",
  "Star Strips",
  "Star Wars",
  "Stellar",
  "Stforek",
  "Stick Letters",
  "Stop",
  "Straight",
  "Stronger Than All",
  "Sub-Zero",
  "Swamp Land",
  "Swan",
  "Sweet",
  "THIS",
  "Tanja",
  "Tengwar",
  "Term",
  "Terrace",
  "Test1",
  "The Edge",
  "Thick",
  "Thin",
  "Thorned",
  "Three Point",
  "Ticks Slant",
  "Ticks",
  "Tiles",
  "Tinker-Toy",
  "Tmplr",
  "Tombstone",
  "Train",
  "Trek",
  "Tsalagi",
  "Tubular",
  "Twisted",
  "Two Point",
  "USA Flag",
  "Univers",
  "Upside Down Text",
  "Varsity",
  "Wavescape",
  "Wavy",
  "Weird",
  "Wet Letter",
  "Whimsy",
  "WideTerm",
  "Wow",
  "miniwi"
];
var renamedFonts = {
  "ANSI-Compact": "ANSI Compact"
};
var getFontName = (name) => {
  return renamedFonts[name] ? renamedFonts[name] : name;
};
function escapeRegExpChar(char) {
  const specialChars = /[.*+?^${}()|[\]\\]/;
  return specialChars.test(char) ? "\\" + char : char;
}
var figlet = (() => {
  const { FULL_WIDTH = 0, FITTING, SMUSHING, CONTROLLED_SMUSHING } = LAYOUT;
  const figFonts = {};
  const figDefaults = {
    font: "Standard",
    fontPath: "./fonts",
    fetchFontIfMissing: true
  };
  function removeEndChar(line, lineNum, fontHeight) {
    const endChar = escapeRegExpChar(line.trim().slice(-1)) || "@";
    const endCharRegEx = lineNum === fontHeight - 1 ? new RegExp(endChar + endChar + "?\\s*$") : new RegExp(endChar + "\\s*$");
    return line.replace(endCharRegEx, "");
  }
  function getSmushingRules(oldLayout = -1, newLayout = null) {
    let rules = {};
    let val;
    let codes = [
      [16384, "vLayout", SMUSHING],
      [8192, "vLayout", FITTING],
      [4096, "vRule5", true],
      [2048, "vRule4", true],
      [1024, "vRule3", true],
      [512, "vRule2", true],
      [256, "vRule1", true],
      [128, "hLayout", SMUSHING],
      [64, "hLayout", FITTING],
      [32, "hRule6", true],
      [16, "hRule5", true],
      [8, "hRule4", true],
      [4, "hRule3", true],
      [2, "hRule2", true],
      [1, "hRule1", true]
    ];
    val = newLayout !== null ? newLayout : oldLayout;
    for (const [code, rule, value] of codes) {
      if (val >= code) {
        val -= code;
        if (rules[rule] === undefined) {
          rules[rule] = value;
        }
      } else if (rule !== "vLayout" && rule !== "hLayout") {
        rules[rule] = false;
      }
    }
    if (typeof rules["hLayout"] === "undefined") {
      if (oldLayout === 0) {
        rules["hLayout"] = FITTING;
      } else if (oldLayout === -1) {
        rules["hLayout"] = FULL_WIDTH;
      } else {
        if (rules["hRule1"] || rules["hRule2"] || rules["hRule3"] || rules["hRule4"] || rules["hRule5"] || rules["hRule6"]) {
          rules["hLayout"] = CONTROLLED_SMUSHING;
        } else {
          rules["hLayout"] = SMUSHING;
        }
      }
    } else if (rules["hLayout"] === SMUSHING) {
      if (rules["hRule1"] || rules["hRule2"] || rules["hRule3"] || rules["hRule4"] || rules["hRule5"] || rules["hRule6"]) {
        rules["hLayout"] = CONTROLLED_SMUSHING;
      }
    }
    if (typeof rules["vLayout"] === "undefined") {
      if (rules["vRule1"] || rules["vRule2"] || rules["vRule3"] || rules["vRule4"] || rules["vRule5"]) {
        rules["vLayout"] = CONTROLLED_SMUSHING;
      } else {
        rules["vLayout"] = FULL_WIDTH;
      }
    } else if (rules["vLayout"] === SMUSHING) {
      if (rules["vRule1"] || rules["vRule2"] || rules["vRule3"] || rules["vRule4"] || rules["vRule5"]) {
        rules["vLayout"] = CONTROLLED_SMUSHING;
      }
    }
    return rules;
  }
  function hRule1_Smush(ch1, ch2, hardBlank = "") {
    if (ch1 === ch2 && ch1 !== hardBlank) {
      return ch1;
    }
    return false;
  }
  function hRule2_Smush(ch1, ch2) {
    let rule2Str = "|/\\[]{}()<>";
    if (ch1 === "_") {
      if (rule2Str.indexOf(ch2) !== -1) {
        return ch2;
      }
    } else if (ch2 === "_") {
      if (rule2Str.indexOf(ch1) !== -1) {
        return ch1;
      }
    }
    return false;
  }
  function hRule3_Smush(ch1, ch2) {
    let rule3Classes = "| /\\ [] {} () <>";
    let r3_pos1 = rule3Classes.indexOf(ch1);
    let r3_pos2 = rule3Classes.indexOf(ch2);
    if (r3_pos1 !== -1 && r3_pos2 !== -1) {
      if (r3_pos1 !== r3_pos2 && Math.abs(r3_pos1 - r3_pos2) !== 1) {
        const startPos = Math.max(r3_pos1, r3_pos2);
        const endPos = startPos + 1;
        return rule3Classes.substring(startPos, endPos);
      }
    }
    return false;
  }
  function hRule4_Smush(ch1, ch2) {
    let rule4Str = "[] {} ()";
    let r4_pos1 = rule4Str.indexOf(ch1);
    let r4_pos2 = rule4Str.indexOf(ch2);
    if (r4_pos1 !== -1 && r4_pos2 !== -1) {
      if (Math.abs(r4_pos1 - r4_pos2) <= 1) {
        return "|";
      }
    }
    return false;
  }
  function hRule5_Smush(ch1, ch2) {
    const patterns = {
      "/\\": "|",
      "\\/": "Y",
      "><": "X"
    };
    return patterns[ch1 + ch2] || false;
  }
  function hRule6_Smush(ch1, ch2, hardBlank = "") {
    if (ch1 === hardBlank && ch2 === hardBlank) {
      return hardBlank;
    }
    return false;
  }
  function vRule1_Smush(ch1, ch2) {
    if (ch1 === ch2) {
      return ch1;
    }
    return false;
  }
  function vRule2_Smush(ch1, ch2) {
    return hRule2_Smush(ch1, ch2);
  }
  function vRule3_Smush(ch1, ch2) {
    return hRule3_Smush(ch1, ch2);
  }
  function vRule4_Smush(ch1, ch2) {
    if (ch1 === "-" && ch2 === "_" || ch1 === "_" && ch2 === "-") {
      return "=";
    }
    return false;
  }
  function vRule5_Smush(ch1, ch2) {
    if (ch1 === "|" && ch2 === "|") {
      return "|";
    }
    return false;
  }
  function uni_Smush(ch1, ch2, hardBlank) {
    if (ch2 === " " || ch2 === "") {
      return ch1;
    } else if (ch2 === hardBlank && ch1 !== " ") {
      return ch1;
    } else {
      return ch2;
    }
  }
  function canVerticalSmush(txt1, txt2, opts) {
    if (opts.fittingRules && opts.fittingRules.vLayout === FULL_WIDTH) {
      return "invalid";
    }
    let ii, len = Math.min(txt1.length, txt2.length), ch1, ch2, endSmush = false, validSmush;
    if (len === 0) {
      return "invalid";
    }
    for (ii = 0;ii < len; ii++) {
      ch1 = txt1.substring(ii, ii + 1);
      ch2 = txt2.substring(ii, ii + 1);
      if (ch1 !== " " && ch2 !== " ") {
        if (opts.fittingRules && opts.fittingRules.vLayout === FITTING) {
          return "invalid";
        } else if (opts.fittingRules && opts.fittingRules.vLayout === SMUSHING) {
          return "end";
        } else {
          if (vRule5_Smush(ch1, ch2)) {
            endSmush = endSmush || false;
            continue;
          }
          validSmush = false;
          validSmush = opts.fittingRules && opts.fittingRules.vRule1 ? vRule1_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && opts.fittingRules && opts.fittingRules.vRule2 ? vRule2_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && opts.fittingRules && opts.fittingRules.vRule3 ? vRule3_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && opts.fittingRules && opts.fittingRules.vRule4 ? vRule4_Smush(ch1, ch2) : validSmush;
          endSmush = true;
          if (!validSmush) {
            return "invalid";
          }
        }
      }
    }
    if (endSmush) {
      return "end";
    } else {
      return "valid";
    }
  }
  function getVerticalSmushDist(lines1, lines2, opts) {
    let maxDist = lines1.length;
    let len1 = lines1.length;
    let subLines1, subLines2, slen;
    let curDist = 1;
    let ii, ret, result;
    while (curDist <= maxDist) {
      subLines1 = lines1.slice(Math.max(0, len1 - curDist), len1);
      subLines2 = lines2.slice(0, Math.min(maxDist, curDist));
      slen = subLines2.length;
      result = "";
      for (ii = 0;ii < slen; ii++) {
        ret = canVerticalSmush(subLines1[ii], subLines2[ii], opts);
        if (ret === "end") {
          result = ret;
        } else if (ret === "invalid") {
          result = ret;
          break;
        } else {
          if (result === "") {
            result = "valid";
          }
        }
      }
      if (result === "invalid") {
        curDist--;
        break;
      }
      if (result === "end") {
        break;
      }
      if (result === "valid") {
        curDist++;
      }
    }
    return Math.min(maxDist, curDist);
  }
  function verticallySmushLines(line1, line2, opts) {
    let ii, len = Math.min(line1.length, line2.length);
    let ch1, ch2, result = "", validSmush;
    const fittingRules = opts.fittingRules || {};
    for (ii = 0;ii < len; ii++) {
      ch1 = line1.substring(ii, ii + 1);
      ch2 = line2.substring(ii, ii + 1);
      if (ch1 !== " " && ch2 !== " ") {
        if (fittingRules.vLayout === FITTING) {
          result += uni_Smush(ch1, ch2);
        } else if (fittingRules.vLayout === SMUSHING) {
          result += uni_Smush(ch1, ch2);
        } else {
          validSmush = false;
          validSmush = fittingRules.vRule5 ? vRule5_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule1 ? vRule1_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule2 ? vRule2_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule3 ? vRule3_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule4 ? vRule4_Smush(ch1, ch2) : validSmush;
          result += validSmush;
        }
      } else {
        result += uni_Smush(ch1, ch2);
      }
    }
    return result;
  }
  function verticalSmush(lines1, lines2, overlap, opts) {
    let len1 = lines1.length;
    let len2 = lines2.length;
    let piece1 = lines1.slice(0, Math.max(0, len1 - overlap));
    let piece2_1 = lines1.slice(Math.max(0, len1 - overlap), len1);
    let piece2_2 = lines2.slice(0, Math.min(overlap, len2));
    let ii, len, line, piece2 = [], piece3;
    len = piece2_1.length;
    for (ii = 0;ii < len; ii++) {
      if (ii >= len2) {
        line = piece2_1[ii];
      } else {
        line = verticallySmushLines(piece2_1[ii], piece2_2[ii], opts);
      }
      piece2.push(line);
    }
    piece3 = lines2.slice(Math.min(overlap, len2), len2);
    return [...piece1, ...piece2, ...piece3];
  }
  function padLines(lines, numSpaces) {
    const padding = " ".repeat(numSpaces);
    return lines.map((line) => line + padding);
  }
  function smushVerticalFigLines(output, lines, opts) {
    let len1 = output[0].length;
    let len2 = lines[0].length;
    let overlap;
    if (len1 > len2) {
      lines = padLines(lines, len1 - len2);
    } else if (len2 > len1) {
      output = padLines(output, len2 - len1);
    }
    overlap = getVerticalSmushDist(output, lines, opts);
    return verticalSmush(output, lines, overlap, opts);
  }
  function getHorizontalSmushLength(txt1, txt2, opts) {
    const fittingRules = opts.fittingRules || {};
    if (fittingRules.hLayout === FULL_WIDTH) {
      return 0;
    }
    let ii, len1 = txt1.length, len2 = txt2.length;
    let maxDist = len1;
    let curDist = 1;
    let breakAfter = false;
    let seg1, seg2, ch1, ch2;
    if (len1 === 0) {
      return 0;
    }
    distCal:
      while (curDist <= maxDist) {
        const seg1StartPos = len1 - curDist;
        seg1 = txt1.substring(seg1StartPos, seg1StartPos + curDist);
        seg2 = txt2.substring(0, Math.min(curDist, len2));
        for (ii = 0;ii < Math.min(curDist, len2); ii++) {
          ch1 = seg1.substring(ii, ii + 1);
          ch2 = seg2.substring(ii, ii + 1);
          if (ch1 !== " " && ch2 !== " ") {
            if (fittingRules.hLayout === FITTING) {
              curDist = curDist - 1;
              break distCal;
            } else if (fittingRules.hLayout === SMUSHING) {
              if (ch1 === opts.hardBlank || ch2 === opts.hardBlank) {
                curDist = curDist - 1;
              }
              break distCal;
            } else {
              breakAfter = true;
              const validSmush = fittingRules.hRule1 && hRule1_Smush(ch1, ch2, opts.hardBlank) || fittingRules.hRule2 && hRule2_Smush(ch1, ch2) || fittingRules.hRule3 && hRule3_Smush(ch1, ch2) || fittingRules.hRule4 && hRule4_Smush(ch1, ch2) || fittingRules.hRule5 && hRule5_Smush(ch1, ch2) || fittingRules.hRule6 && hRule6_Smush(ch1, ch2, opts.hardBlank);
              if (!validSmush) {
                curDist = curDist - 1;
                break distCal;
              }
            }
          }
        }
        if (breakAfter) {
          break;
        }
        curDist++;
      }
    return Math.min(maxDist, curDist);
  }
  function horizontalSmush(textBlock1, textBlock2, overlap, opts) {
    let ii, jj, outputFig = [], overlapStart, piece1, piece2, piece3, len1, len2, txt1, txt2;
    const fittingRules = opts.fittingRules || {};
    if (typeof opts.height !== "number") {
      throw new Error("height is not defined.");
    }
    for (ii = 0;ii < opts.height; ii++) {
      txt1 = textBlock1[ii];
      txt2 = textBlock2[ii];
      len1 = txt1.length;
      len2 = txt2.length;
      overlapStart = len1 - overlap;
      piece1 = txt1.slice(0, Math.max(0, overlapStart));
      piece2 = "";
      const seg1StartPos = Math.max(0, len1 - overlap);
      let seg1 = txt1.substring(seg1StartPos, seg1StartPos + overlap);
      let seg2 = txt2.substring(0, Math.min(overlap, len2));
      for (jj = 0;jj < overlap; jj++) {
        let ch1 = jj < len1 ? seg1.substring(jj, jj + 1) : " ";
        let ch2 = jj < len2 ? seg2.substring(jj, jj + 1) : " ";
        if (ch1 !== " " && ch2 !== " ") {
          if (fittingRules.hLayout === FITTING || fittingRules.hLayout === SMUSHING) {
            piece2 += uni_Smush(ch1, ch2, opts.hardBlank);
          } else {
            const nextCh = fittingRules.hRule1 && hRule1_Smush(ch1, ch2, opts.hardBlank) || fittingRules.hRule2 && hRule2_Smush(ch1, ch2) || fittingRules.hRule3 && hRule3_Smush(ch1, ch2) || fittingRules.hRule4 && hRule4_Smush(ch1, ch2) || fittingRules.hRule5 && hRule5_Smush(ch1, ch2) || fittingRules.hRule6 && hRule6_Smush(ch1, ch2, opts.hardBlank) || uni_Smush(ch1, ch2, opts.hardBlank);
            piece2 += nextCh;
          }
        } else {
          piece2 += uni_Smush(ch1, ch2, opts.hardBlank);
        }
      }
      if (overlap >= len2) {
        piece3 = "";
      } else {
        piece3 = txt2.substring(overlap, overlap + Math.max(0, len2 - overlap));
      }
      outputFig[ii] = piece1 + piece2 + piece3;
    }
    return outputFig;
  }
  function newFigChar(len) {
    return new Array(len).fill("");
  }
  const figLinesWidth = function(textLines) {
    return Math.max(...textLines.map((line) => line.length));
  };
  function joinFigArray(array, len, opts) {
    return array.reduce(function(acc, data) {
      return horizontalSmush(acc, data.fig, data.overlap || 0, opts);
    }, newFigChar(len));
  }
  function breakWord(figChars, len, opts) {
    for (let i = figChars.length - 1;i > 0; i--) {
      const w = joinFigArray(figChars.slice(0, i), len, opts);
      if (figLinesWidth(w) <= opts.width) {
        return {
          outputFigText: w,
          chars: figChars.slice(i)
        };
      }
    }
    return { outputFigText: newFigChar(len), chars: figChars };
  }
  function generateFigTextLines(txt, figChars, opts) {
    let charIndex, figChar, overlap = 0, row, outputFigText, len, height = opts.height, outputFigLines = [], maxWidth, nextFigChars = {
      chars: [],
      overlap
    }, figWords = [], char, isSpace, textFigWord, textFigLine, tmpBreak;
    if (typeof height !== "number") {
      throw new Error("height is not defined.");
    }
    outputFigText = newFigChar(height);
    const fittingRules = opts.fittingRules || {};
    if (opts.printDirection === 1) {
      txt = txt.split("").reverse().join("");
    }
    len = txt.length;
    for (charIndex = 0;charIndex < len; charIndex++) {
      char = txt.substring(charIndex, charIndex + 1);
      isSpace = char.match(/\s/);
      figChar = figChars[char.charCodeAt(0)];
      textFigLine = null;
      if (figChar) {
        if (fittingRules.hLayout !== FULL_WIDTH) {
          overlap = 1e4;
          for (row = 0;row < height; row++) {
            overlap = Math.min(overlap, getHorizontalSmushLength(outputFigText[row], figChar[row], opts));
          }
          overlap = overlap === 1e4 ? 0 : overlap;
        }
        if (opts.width > 0) {
          if (opts.whitespaceBreak) {
            textFigWord = joinFigArray(nextFigChars.chars.concat([
              {
                fig: figChar,
                overlap
              }
            ]), height, opts);
            textFigLine = joinFigArray(figWords.concat([
              {
                fig: textFigWord,
                overlap: nextFigChars.overlap
              }
            ]), height, opts);
            maxWidth = figLinesWidth(textFigLine);
          } else {
            textFigLine = horizontalSmush(outputFigText, figChar, overlap, opts);
            maxWidth = figLinesWidth(textFigLine);
          }
          if (maxWidth >= opts.width && charIndex > 0) {
            if (opts.whitespaceBreak) {
              outputFigText = joinFigArray(figWords.slice(0, -1), height, opts);
              if (figWords.length > 1) {
                outputFigLines.push(outputFigText);
                outputFigText = newFigChar(height);
              }
              figWords = [];
            } else {
              outputFigLines.push(outputFigText);
              outputFigText = newFigChar(height);
            }
          }
        }
        if (opts.width > 0 && opts.whitespaceBreak) {
          if (!isSpace || charIndex === len - 1) {
            nextFigChars.chars.push({ fig: figChar, overlap });
          }
          if (isSpace || charIndex === len - 1) {
            tmpBreak = null;
            while (true) {
              textFigLine = joinFigArray(nextFigChars.chars, height, opts);
              maxWidth = figLinesWidth(textFigLine);
              if (maxWidth >= opts.width) {
                tmpBreak = breakWord(nextFigChars.chars, height, opts);
                nextFigChars = { chars: tmpBreak.chars };
                outputFigLines.push(tmpBreak.outputFigText);
              } else {
                break;
              }
            }
            if (maxWidth > 0) {
              if (tmpBreak) {
                figWords.push({ fig: textFigLine, overlap: 1 });
              } else {
                figWords.push({
                  fig: textFigLine,
                  overlap: nextFigChars.overlap
                });
              }
            }
            if (isSpace) {
              figWords.push({ fig: figChar, overlap });
              outputFigText = newFigChar(height);
            }
            if (charIndex === len - 1) {
              outputFigText = joinFigArray(figWords, height, opts);
            }
            nextFigChars = {
              chars: [],
              overlap
            };
            continue;
          }
        }
        outputFigText = horizontalSmush(outputFigText, figChar, overlap, opts);
      }
    }
    if (figLinesWidth(outputFigText) > 0) {
      outputFigLines.push(outputFigText);
    }
    if (!opts.showHardBlanks) {
      outputFigLines.forEach(function(outputFigText2) {
        len = outputFigText2.length;
        for (row = 0;row < len; row++) {
          outputFigText2[row] = outputFigText2[row].replace(new RegExp("\\" + opts.hardBlank, "g"), " ");
        }
      });
    }
    if (txt === "" && outputFigLines.length === 0) {
      outputFigLines.push(new Array(height).fill(""));
    }
    return outputFigLines;
  }
  const getHorizontalFittingRules = function(layout, options) {
    let params;
    const fittingRules = options.fittingRules || {};
    if (layout === "default") {
      params = {
        hLayout: fittingRules.hLayout,
        hRule1: fittingRules.hRule1,
        hRule2: fittingRules.hRule2,
        hRule3: fittingRules.hRule3,
        hRule4: fittingRules.hRule4,
        hRule5: fittingRules.hRule5,
        hRule6: fittingRules.hRule6
      };
    } else if (layout === "full") {
      params = {
        hLayout: FULL_WIDTH,
        hRule1: false,
        hRule2: false,
        hRule3: false,
        hRule4: false,
        hRule5: false,
        hRule6: false
      };
    } else if (layout === "fitted") {
      params = {
        hLayout: FITTING,
        hRule1: false,
        hRule2: false,
        hRule3: false,
        hRule4: false,
        hRule5: false,
        hRule6: false
      };
    } else if (layout === "controlled smushing") {
      params = {
        hLayout: CONTROLLED_SMUSHING,
        hRule1: true,
        hRule2: true,
        hRule3: true,
        hRule4: true,
        hRule5: true,
        hRule6: true
      };
    } else if (layout === "universal smushing") {
      params = {
        hLayout: SMUSHING,
        hRule1: false,
        hRule2: false,
        hRule3: false,
        hRule4: false,
        hRule5: false,
        hRule6: false
      };
    } else {
      return;
    }
    return params;
  };
  const getVerticalFittingRules = function(layout, options) {
    let params = {};
    const fittingRules = options.fittingRules || {};
    if (layout === "default") {
      params = {
        vLayout: fittingRules.vLayout,
        vRule1: fittingRules.vRule1,
        vRule2: fittingRules.vRule2,
        vRule3: fittingRules.vRule3,
        vRule4: fittingRules.vRule4,
        vRule5: fittingRules.vRule5
      };
    } else if (layout === "full") {
      params = {
        vLayout: FULL_WIDTH,
        vRule1: false,
        vRule2: false,
        vRule3: false,
        vRule4: false,
        vRule5: false
      };
    } else if (layout === "fitted") {
      params = {
        vLayout: FITTING,
        vRule1: false,
        vRule2: false,
        vRule3: false,
        vRule4: false,
        vRule5: false
      };
    } else if (layout === "controlled smushing") {
      params = {
        vLayout: CONTROLLED_SMUSHING,
        vRule1: true,
        vRule2: true,
        vRule3: true,
        vRule4: true,
        vRule5: true
      };
    } else if (layout === "universal smushing") {
      params = {
        vLayout: SMUSHING,
        vRule1: false,
        vRule2: false,
        vRule3: false,
        vRule4: false,
        vRule5: false
      };
    } else {
      return;
    }
    return params;
  };
  const generateText = function(fontName, options, txt) {
    txt = txt.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
    const actualFontName = getFontName(fontName);
    let lines = txt.split(`
`);
    let figLines = [];
    let ii, len, output;
    len = lines.length;
    for (ii = 0;ii < len; ii++) {
      figLines = figLines.concat(generateFigTextLines(lines[ii], figFonts[actualFontName], options));
    }
    len = figLines.length;
    output = figLines[0];
    for (ii = 1;ii < len; ii++) {
      output = smushVerticalFigLines(output, figLines[ii], options);
    }
    return output ? output.join(`
`) : "";
  };
  function _reworkFontOpts(fontMeta, options) {
    let myOpts;
    if (typeof structuredClone !== "undefined") {
      myOpts = structuredClone(fontMeta);
    } else {
      myOpts = JSON.parse(JSON.stringify(fontMeta));
    }
    myOpts.showHardBlanks = options.showHardBlanks || false;
    myOpts.width = options.width || -1;
    myOpts.whitespaceBreak = options.whitespaceBreak || false;
    if (options.horizontalLayout) {
      const params = getHorizontalFittingRules(options.horizontalLayout, fontMeta);
      if (params) {
        Object.assign(myOpts.fittingRules, params);
      }
    }
    if (options.verticalLayout) {
      const params = getVerticalFittingRules(options.verticalLayout, fontMeta);
      if (params) {
        Object.assign(myOpts.fittingRules, params);
      }
    }
    myOpts.printDirection = options.printDirection !== null && options.printDirection !== undefined ? options.printDirection : fontMeta.printDirection;
    return myOpts;
  }
  const me = async function(txt, optionsOrFontOrCallback, callback) {
    return me.text(txt, optionsOrFontOrCallback, callback);
  };
  me.text = async function(txt, optionsOrFontOrCallback, callback) {
    txt = txt + "";
    let options, next;
    if (typeof optionsOrFontOrCallback === "function") {
      next = optionsOrFontOrCallback;
      options = { font: figDefaults.font };
    } else if (typeof optionsOrFontOrCallback === "string") {
      options = { font: optionsOrFontOrCallback };
      next = callback;
    } else if (optionsOrFontOrCallback) {
      options = optionsOrFontOrCallback;
      next = callback;
    } else {
      options = { font: figDefaults.font };
      next = callback;
    }
    const fontName = options.font || figDefaults.font;
    try {
      const fontOpts = await me.loadFont(fontName);
      const generatedTxt = fontOpts ? generateText(fontName, _reworkFontOpts(fontOpts, options), txt) : "";
      if (next) {
        next(null, generatedTxt);
      }
      return generatedTxt;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (next) {
        next(error);
        return "";
      }
      throw error;
    }
  };
  me.textSync = function(txt, options) {
    txt = txt + "";
    if (typeof options === "string") {
      options = { font: options };
    } else {
      options = options || {};
    }
    const fontName = options.font || figDefaults.font;
    let fontOpts = _reworkFontOpts(me.loadFontSync(fontName), options);
    return generateText(fontName, fontOpts, txt);
  };
  me.metadata = async function(fontName, callback) {
    fontName = fontName + "";
    try {
      const fontOpts = await me.loadFont(fontName);
      if (!fontOpts) {
        throw new Error("Error loading font.");
      }
      const actualFontName = getFontName(fontName);
      const font = figFonts[actualFontName] || {};
      const result = [fontOpts, font.comment || ""];
      if (callback) {
        callback(null, fontOpts, font.comment);
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (callback) {
        callback(error);
        return null;
      }
      throw error;
    }
  };
  me.defaults = function(opts) {
    if (opts && typeof opts === "object") {
      Object.assign(figDefaults, opts);
    }
    if (typeof structuredClone !== "undefined") {
      return structuredClone(figDefaults);
    } else {
      return JSON.parse(JSON.stringify(figDefaults));
    }
  };
  me.parseFont = function(fontName, data, override = true) {
    if (figFonts[fontName] && !override) {
      return figFonts[fontName].options;
    }
    data = data.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
    const font = new FigletFont;
    const lines = data.split(`
`);
    const headerLine = lines.shift();
    if (!headerLine) {
      throw new Error("Invalid font file: missing header");
    }
    const headerData = headerLine.split(" ");
    const opts = {
      hardBlank: headerData[0].substring(5, 6),
      height: parseInt(headerData[1], 10),
      baseline: parseInt(headerData[2], 10),
      maxLength: parseInt(headerData[3], 10),
      oldLayout: parseInt(headerData[4], 10),
      numCommentLines: parseInt(headerData[5], 10),
      printDirection: headerData[6] ? parseInt(headerData[6], 10) : 0,
      fullLayout: headerData[7] ? parseInt(headerData[7], 10) : null,
      codeTagCount: headerData[8] ? parseInt(headerData[8], 10) : null
    };
    const hardBlank = opts.hardBlank || "";
    if (hardBlank.length !== 1 || [
      opts.height,
      opts.baseline,
      opts.maxLength,
      opts.oldLayout,
      opts.numCommentLines
    ].some((val) => val === null || val === undefined || isNaN(val))) {
      throw new Error("FIGlet header contains invalid values.");
    }
    if (opts.height == null || opts.numCommentLines == null) {
      throw new Error("FIGlet header contains invalid values.");
    }
    opts.fittingRules = getSmushingRules(opts.oldLayout, opts.fullLayout);
    font.options = opts;
    const charNums = [];
    for (let i = 32;i <= 126; i++) {
      charNums.push(i);
    }
    charNums.push(196, 214, 220, 228, 246, 252, 223);
    if (lines.length < opts.numCommentLines + opts.height * charNums.length) {
      throw new Error(`FIGlet file is missing data. Line length: ${lines.length}. Comment lines: ${opts.numCommentLines}. Height: ${opts.height}. Num chars: ${charNums.length}.`);
    }
    font.comment = lines.splice(0, opts.numCommentLines).join(`
`);
    font.numChars = 0;
    while (lines.length > 0 && font.numChars < charNums.length) {
      const cNum = charNums[font.numChars];
      font[cNum] = lines.splice(0, opts.height);
      for (let i = 0;i < opts.height; i++) {
        if (typeof font[cNum][i] === "undefined") {
          font[cNum][i] = "";
        } else {
          font[cNum][i] = removeEndChar(font[cNum][i], i, opts.height);
        }
      }
      font.numChars++;
    }
    while (lines.length > 0) {
      const cNumLine = lines.shift();
      if (!cNumLine || cNumLine.trim() === "")
        break;
      let cNum = cNumLine.split(" ")[0];
      let parsedNum;
      if (/^-?0[xX][0-9a-fA-F]+$/.test(cNum)) {
        parsedNum = parseInt(cNum, 16);
      } else if (/^-?0[0-7]+$/.test(cNum)) {
        parsedNum = parseInt(cNum, 8);
      } else if (/^-?[0-9]+$/.test(cNum)) {
        parsedNum = parseInt(cNum, 10);
      } else {
        throw new Error(`Error parsing data. Invalid data: ${cNum}`);
      }
      if (parsedNum === -1 || parsedNum < -2147483648 || parsedNum > 2147483647) {
        const msg = parsedNum === -1 ? "The char code -1 is not permitted." : `The char code cannot be ${parsedNum < -2147483648 ? "less than -2147483648" : "greater than 2147483647"}.`;
        throw new Error(`Error parsing data. ${msg}`);
      }
      font[parsedNum] = lines.splice(0, opts.height);
      for (let i = 0;i < opts.height; i++) {
        if (typeof font[parsedNum][i] === "undefined") {
          font[parsedNum][i] = "";
        } else {
          font[parsedNum][i] = removeEndChar(font[parsedNum][i], i, opts.height);
        }
      }
      font.numChars++;
    }
    figFonts[fontName] = font;
    return opts;
  };
  me.loadedFonts = () => {
    return Object.keys(figFonts);
  };
  me.clearLoadedFonts = () => {
    Object.keys(figFonts).forEach((key) => {
      delete figFonts[key];
    });
  };
  me.loadFont = async function(fontName, callback) {
    const actualFontName = getFontName(fontName);
    if (figFonts[actualFontName]) {
      const result = figFonts[actualFontName].options;
      if (callback) {
        callback(null, result);
      }
      return Promise.resolve(result);
    }
    try {
      if (!figDefaults.fetchFontIfMissing) {
        throw new Error(`Font is not loaded: ${actualFontName}`);
      }
      const response = await fetch(`${figDefaults.fontPath}/${actualFontName}.flf`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const text = await response.text();
      const result = me.parseFont(actualFontName, text);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (callback) {
        callback(err);
        return null;
      }
      throw err;
    }
  };
  me.loadFontSync = function(name) {
    const actualFontName = getFontName(name);
    if (figFonts[actualFontName]) {
      return figFonts[actualFontName].options;
    }
    throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.");
  };
  me.preloadFonts = async function(fonts, callback) {
    try {
      for (const name of fonts) {
        const actualFontName = getFontName(name);
        const response = await fetch(`${figDefaults.fontPath}/${actualFontName}.flf`);
        if (!response.ok) {
          throw new Error(`Failed to preload fonts. Error fetching font: ${actualFontName}, status code: ${response.statusText}`);
        }
        const data = await response.text();
        me.parseFont(actualFontName, data);
      }
      if (callback) {
        callback();
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (callback) {
        callback(err);
        return;
      }
      throw error;
    }
  };
  me.fonts = function(callback) {
    return new Promise(function(resolve, reject) {
      resolve(fontList);
      if (callback) {
        callback(null, fontList);
      }
    });
  };
  me.fontsSync = function() {
    return fontList;
  };
  me.figFonts = figFonts;
  return me;
})();

// node_modules/figlet/dist/node-figlet.mjs
import { fileURLToPath } from "url";
var __filename2 = fileURLToPath(import.meta.url);
var __dirname2 = path.dirname(__filename2);
var fontPath = path.join(__dirname2, "/../fonts/");
var nodeFiglet = figlet;
nodeFiglet.defaults({ fontPath });
nodeFiglet.loadFont = function(name, callback) {
  const actualFontName = getFontName(name);
  return new Promise((resolve, reject) => {
    if (nodeFiglet.figFonts[actualFontName]) {
      if (callback) {
        callback(null, nodeFiglet.figFonts[actualFontName].options);
      }
      resolve(nodeFiglet.figFonts[actualFontName].options);
      return;
    }
    fs.readFile(path.join(nodeFiglet.defaults().fontPath, actualFontName + ".flf"), { encoding: "utf-8" }, (err, fontData) => {
      if (err) {
        if (callback) {
          callback(err);
        }
        reject(err);
        return;
      }
      fontData = fontData + "";
      try {
        const font = nodeFiglet.parseFont(actualFontName, fontData);
        if (callback) {
          callback(null, font);
        }
        resolve(font);
      } catch (error) {
        const typedError = error instanceof Error ? error : new Error(String(error));
        if (callback) {
          callback(typedError);
        }
        reject(typedError);
      }
    });
  });
};
nodeFiglet.loadFontSync = function(font) {
  const actualFontName = getFontName(font);
  if (nodeFiglet.figFonts[actualFontName]) {
    return nodeFiglet.figFonts[actualFontName].options;
  }
  const fontData = fs.readFileSync(path.join(nodeFiglet.defaults().fontPath, actualFontName + ".flf"), {
    encoding: "utf-8"
  }) + "";
  return nodeFiglet.parseFont(actualFontName, fontData);
};
nodeFiglet.fonts = function(next) {
  return new Promise((resolve, reject) => {
    const fontList2 = [];
    fs.readdir(nodeFiglet.defaults().fontPath, (err, files) => {
      if (err) {
        next && next(err);
        reject(err);
        return;
      }
      files.forEach((file) => {
        if (/\.flf$/.test(file)) {
          fontList2.push(file.replace(/\.flf$/, ""));
        }
      });
      next && next(null, fontList2);
      resolve(fontList2);
    });
  });
};
nodeFiglet.fontsSync = function() {
  const fontList2 = [];
  fs.readdirSync(nodeFiglet.defaults().fontPath).forEach((file) => {
    if (/\.flf$/.test(file)) {
      fontList2.push(file.replace(/\.flf$/, ""));
    }
  });
  return fontList2;
};

// src/banner.ts
import { existsSync as existsSync2 } from "fs";
import { join as join2 } from "path";
function findFontPath(fontName) {
  const possiblePaths = [
    "/usr/local/share/caddy_cli/fonts",
    join2(process.cwd(), "node_modules", "figlet", "fonts")
  ];
  for (const fontPath2 of possiblePaths) {
    const fontFile = join2(fontPath2, `${fontName}.flf`);
    if (existsSync2(fontFile)) {
      return fontFile;
    }
  }
  return null;
}
function printBanner() {
  const fontPath2 = findFontPath("ANSI Shadow");
  try {
    const banner = nodeFiglet.textSync("Caddy CLI", {
      font: "ANSI Shadow",
      fontFile: fontPath2 || undefined,
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true
    });
    console.log(banner);
  } catch {
    console.log(`
  ____          _     _          ____ _     ___ 
 | |   / _\` |/ _\` |/ _\` | | | | | |   | |    | | 
 | |__| (_| | (_| | (_| | |_| | | |___| |___ | | 
  \\____\\__,_|\\__,_|\\__,_|\\__, |  \\____|_____|___|
                          |___/                   
    `);
  }
}

// src/ui.ts
init_dist2();
var cyan = (s) => `\x1B[36m${s}\x1B[0m`;
var green = (s) => `\x1B[32m${s}\x1B[0m`;
var red = (s) => `\x1B[31m${s}\x1B[0m`;
var yellow = (s) => `\x1B[33m${s}\x1B[0m`;
var bold = (s) => `\x1B[1m${s}\x1B[0m`;
var dim = (s) => `\x1B[2m${s}\x1B[0m`;
async function showMainMenu(sites) {
  const options = [];
  if (sites.length > 0) {
    for (const site of sites) {
      options.push({
        value: `site:${site.domain}`,
        label: `${cyan(site.domain)} \u2192 ${site.container_name}:${site.container_port || "80"}`
      });
    }
    options.push({ value: "divider1", label: dim("\u2500".repeat(30)) });
  }
  options.push({ value: "add", label: green("\uFF0B") + " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0430\u0439\u0442" }, { value: "reload", label: yellow("\u21BB") + " \u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C Caddy" });
  options.push({ value: "divider2", label: dim("\u2500".repeat(30)) });
  options.push({ value: "quit", label: red("\u2715") + " \u0412\u044B\u0445\u043E\u0434" });
  const choice = await ie({
    message: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E:",
    options
  });
  if (!choice || choice === "quit") {
    return { action: "quit" };
  }
  if (choice === "add") {
    return { action: "add" };
  }
  if (choice === "reload") {
    return { action: "reload" };
  }
  if (typeof choice === "string" && choice.startsWith("site:")) {
    const domain = choice.replace("site:", "");
    const site = sites.find((s) => s.domain === domain);
    return { action: "site", site };
  }
  return { action: "quit" };
}
async function showSiteMenu(site) {
  console.log(`
${bold("\u2550".repeat(50))}
${bold("  \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0441\u0430\u0439\u0442\u0435  ".padEnd(50, "\u2550"))}
${bold("\u2550".repeat(50))}

  ${bold("\u0414\u043E\u043C\u0435\u043D:")} ${cyan(site.domain)}
  ${bold("\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440:")} ${site.container_name}
  ${bold("\u041F\u043E\u0440\u0442:")} ${site.container_port || "80"}

${bold("\u2550".repeat(50))}
  `);
  const choice = await ie({
    message: `\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 ${site.domain}:`,
    options: [
      { value: "edit", label: green("\u270E") + " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440" },
      { value: "delete", label: red("\u2715") + " \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0430\u0439\u0442" },
      { value: "divider", label: dim("\u2500".repeat(30)) },
      { value: "back", label: "\u2190 \u041D\u0430\u0437\u0430\u0434" }
    ]
  });
  if (!choice || choice === "back") {
    return { action: "back" };
  }
  if (choice === "edit") {
    return { action: "edit", site };
  }
  if (choice === "delete") {
    return { action: "delete", site };
  }
  return { action: "back" };
}
function getUsedContainers(sites) {
  return new Set(sites.map((s) => s.container_name));
}
async function selectContainer(containers, sites) {
  const usedContainers = getUsedContainers(sites);
  const availableContainers = containers.filter((c2) => !usedContainers.has(c2.name));
  const choices = [];
  if (availableContainers.length > 0) {
    for (const c2 of availableContainers) {
      const portsStr = c2.ports.length > 0 ? c2.ports.join(", ") : "80";
      choices.push({
        value: `${c2.name}:${c2.ports[0] || "80"}`,
        label: `${c2.name} (${portsStr})`
      });
    }
    choices.push({ value: "divider", label: dim("\u2500".repeat(30)) });
  }
  if (containers.length === 0) {
    console.log(red("\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u043E\u0432 \u0432 \u0441\u0435\u0442\u0438 caddy."));
    return null;
  }
  if (availableContainers.length === 0) {
    console.log(yellow("\u0412\u0441\u0435 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B \u0443\u0436\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u043A \u0441\u0430\u0439\u0442\u0430\u043C."));
    return null;
  }
  choices.push({ value: "back", label: "\u2190 \u041D\u0430\u0437\u0430\u0434" });
  const selected = await ie({
    message: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440:",
    options: choices
  });
  if (!selected || typeof selected !== "string" || selected === "back")
    return null;
  const [name, port] = selected.split(":");
  return {
    name,
    port: port || "80"
  };
}
async function askDomain() {
  const domain = await te({
    message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u043E\u043C\u0435\u043D (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: example.com):",
    placeholder: "example.com",
    validate: (value) => {
      if (!value.includes(".")) {
        return "\u0414\u043E\u043C\u0435\u043D \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0442\u043E\u0447\u043A\u0443";
      }
      return;
    }
  });
  if (!domain || typeof domain !== "string")
    return null;
  return domain;
}
async function confirmAction(message) {
  const confirmed = await se({
    message
  });
  return confirmed;
}
function printSuccess(message) {
  console.log(green(`\u2713 ${message}`));
}
function printError(message) {
  console.log(red(`\u2717 ${message}`));
}
function printInfo(message) {
  console.log(cyan(`\u2139 ${message}`));
}

// src/main.ts
var containers = [];
async function setupCaddyPath() {
  console.log("");
  console.log(`
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502                    \u0412\u0410\u0416\u041D\u0410\u042F \u0418\u041D\u0424\u041E\u0420\u041C\u0410\u0426\u0418\u042F                     \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  \u0414\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F:                        \u2502
\u2502                                                         \u2502
\u2502  1. Caddy \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0432 Docker-\u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0435      \u2502
\u2502  2. \u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0432 \u0441\u0435\u0442\u0438 "caddy"               \u2502
\u2502  3. Docker \u0441\u043E\u043A\u0435\u0442 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D                  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
  `);
  console.log("");
  printInfo("\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0443\u0442\u044C \u043A \u043F\u0430\u043F\u043A\u0435 \u0441 Caddy");
  const defaultPath = "../caddy";
  const { text } = await Promise.resolve().then(() => (init_dist2(), exports_dist));
  const pathInput = await text({
    message: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0443\u0442\u044C \u043A \u043F\u0430\u043F\u043A\u0435 \u0441 Caddy:",
    placeholder: defaultPath,
    initialValue: defaultPath
  });
  const caddyPath = (typeof pathInput === "string" ? pathInput : defaultPath) || defaultPath;
  setCaddyPath(caddyPath);
  const caddyfilePath = getCaddyfilePath();
  if (!existsSync3(caddyfilePath)) {
    printError(`Caddyfile \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043F\u043E \u043F\u0443\u0442\u0438: ${caddyfilePath}`);
    return false;
  }
  printSuccess(`\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u043F\u0443\u0442\u044C: ${caddyPath}`);
  return true;
}
async function saveAndReload(sites) {
  try {
    await saveSites(sites);
    printSuccess("Caddyfile \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D");
    printInfo("\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 Caddy...");
    const reloaded = await reloadCaddy();
    if (reloaded) {
      printSuccess("Caddy \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D");
      return true;
    } else {
      printError("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C Caddy");
      return false;
    }
  } catch (error) {
    printError(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438: ${error}`);
    return false;
  }
}
async function handleAdd(currentSites) {
  const domain = await askDomain();
  if (!domain)
    return currentSites;
  const existingSite = currentSites.find((s) => s.domain === domain);
  if (existingSite) {
    printError(`\u0421\u0430\u0439\u0442 ${domain} \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442`);
    return currentSites;
  }
  const container = await selectContainer(containers, currentSites);
  if (!container)
    return currentSites;
  const confirmed = await confirmAction(`\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0430\u0439\u0442 ${domain} \u2192 ${container.name}:${container.port}?`);
  if (!confirmed)
    return currentSites;
  const newSite = {
    domain,
    container_name: container.name,
    container_port: container.port
  };
  const newSites = [...currentSites, newSite];
  printSuccess(`\u0421\u0430\u0439\u0442 ${domain} \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D`);
  const save = await confirmAction("\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433 \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C Caddy?");
  if (save) {
    await saveAndReload(newSites);
  }
  return newSites;
}
async function handleEdit(site, currentSites) {
  printInfo(`\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F: ${site.domain} \u2192 ${site.container_name}:${site.container_port || "80"}`);
  const container = await selectContainer(containers, currentSites);
  if (!container)
    return currentSites;
  const confirmed = await confirmAction(`\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u043D\u0430 ${container.name}:${container.port}?`);
  if (!confirmed)
    return currentSites;
  const newSites = currentSites.map((s) => s.domain === site.domain ? { ...s, container_name: container.name, container_port: container.port } : s);
  printSuccess(`\u0421\u0430\u0439\u0442 ${site.domain} \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D`);
  const save = await confirmAction("\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433 \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C Caddy?");
  if (save) {
    await saveAndReload(newSites);
  }
  return newSites;
}
async function handleDelete(site, currentSites) {
  const confirmed = await confirmAction(`\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0430\u0439\u0442 ${site.domain}?`);
  if (!confirmed)
    return currentSites;
  const newSites = currentSites.filter((s) => s.domain !== site.domain);
  printSuccess(`\u0421\u0430\u0439\u0442 ${site.domain} \u0443\u0434\u0430\u043B\u0451\u043D`);
  const save = await confirmAction("\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433 \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C Caddy?");
  if (save) {
    await saveAndReload(newSites);
  }
  return newSites;
}
async function handleReload() {
  const confirmed = await confirmAction("\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C Caddy?");
  if (!confirmed)
    return false;
  const sites = await getSites();
  return await saveAndReload(sites);
}
async function main() {
  printBanner();
  const caddyReady = await setupCaddyPath();
  if (!caddyReady) {
    printError("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0443\u0442\u044C \u043A Caddy. \u0412\u044B\u0445\u043E\u0434.");
    process.exit(1);
  }
  containers = await getAllContainers();
  if (containers.length === 0) {
    printInfo("\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0441\u0430\u0439\u0442\u0430 \u043C\u043E\u0436\u043D\u043E \u0432\u0432\u0435\u0441\u0442\u0438 \u0438\u043C\u044F \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430 \u0432\u0440\u0443\u0447\u043D\u0443\u044E.");
  } else {
    printSuccess(`\u041D\u0430\u0439\u0434\u0435\u043D\u043E ${containers.length} \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u043E\u0432 \u0432 \u0441\u0435\u0442\u0438 caddy`);
  }
  console.log("");
  let sites = await getSites();
  while (true) {
    const result = await showMainMenu(sites);
    switch (result.action) {
      case "add":
        sites = await handleAdd(sites);
        break;
      case "site":
        if (result.site) {
          while (true) {
            const siteResult = await showSiteMenu(result.site);
            if (siteResult.action === "back") {
              sites = await getSites();
              break;
            }
            if (siteResult.action === "edit") {
              sites = await handleEdit(result.site, sites);
            }
            if (siteResult.action === "delete") {
              sites = await handleDelete(result.site, sites);
              break;
            }
          }
        }
        break;
      case "reload":
        await handleReload();
        break;
      case "quit":
        printInfo("\u0414\u043E \u0441\u0432\u0438\u0434\u0430\u043D\u0438\u044F!");
        process.exit(0);
    }
  }
}
main().catch((error) => {
  printError(`\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430: ${error}`);
  process.exit(1);
});
