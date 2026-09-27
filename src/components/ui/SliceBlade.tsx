// Slice Blade — Originkit

"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

const GLYPHS: Record<string, string[]> = {
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
    "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
    D: ["11100", "10010", "10001", "10001", "10001", "10010", "11100"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    G: ["01110", "10001", "10000", "10111", "10001", "10001", "01111"],
    H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
    J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
    K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
    X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "%": ["11001", "11010", "00010", "00100", "01000", "01011", "10011"],
    "!": ["00100", "00100", "00100", "00100", "00100", "00000", "00100"],
    "?": ["01110", "10001", "00001", "00010", "00100", "00000", "00100"],
    "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
    "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
    ".": ["00000", "00000", "00000", "00000", "00000", "00000", "00100"],
    ":": ["00000", "00100", "00000", "00000", "00000", "00100", "00000"],
};
const GW = 5;
const GH = 7;

function chars(title: string, fallback: string): string[] {
    const src = (title || "")
        .toUpperCase()
        .split("")
        .filter((c) => GLYPHS[c]);
    return src.length ? src : fallback.split("");
}

function drawGlyph(ctx: CanvasRenderingContext2D, ch: string, cx: number, cy: number, px: number) {
    const bits = GLYPHS[ch];
    if (!bits) return;
    const x0 = cx - (GW * px) / 2;
    const y0 = cy - (GH * px) / 2;
    for (let r = 0; r < GH; r++)
        for (let c = 0; c < GW; c++)
            if (bits[r][c] === "1") ctx.fillRect(x0 + c * px, y0 + r * px, px + 0.4, px + 0.4);
}

function drawText(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, px: number) {
    const t = String(s).toUpperCase();
    let ox = x;
    for (let i = 0; i < t.length; i++) {
        const ch = t[i];
        if (ch === " ") {
            ox += 4 * px;
            continue;
        }
        const bits = GLYPHS[ch];
        if (!bits) {
            ox += (GW + 1) * px;
            continue;
        }
        for (let r = 0; r < GH; r++)
            for (let c = 0; c < GW; c++)
                if (bits[r][c] === "1") ctx.fillRect(ox + c * px, y + r * px, px, px);
        ox += (GW + 1) * px;
    }
    return ox - x;
}

function textWidth(s: string, px: number) {
    const t = String(s).toUpperCase();
    let w = 0;
    for (const ch of t) w += (ch === " " ? 4 : GW + 1) * px;
    return Math.max(0, w - px);
}

function cssColor(v: string): string {
    const s = (v || "").trim();
    const m = /^var\(\s*--[^,)]*,\s*([\s\S]+)\)\s*$/.exec(s);
    return m ? m[1].trim() : s;
}

function segDist(ax: number, ay: number, bx: number, by: number, px: number, py: number) {
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = len2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

interface Piece {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    vr: number;
    ch: string;
    bomb: boolean;
}

interface Half {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    vr: number;
    ch: string;

    cutA: number;
    side: 0 | 1;
    life: number;
}

interface World {
    pieces: Piece[];
    halves: Half[];

    trail: number[];
    score: number;
    best: number;
    combo: number;

    comboT: number;
    lives: number;

    livesSet: number;
    over: boolean;
    overT: number;
    spawnIn: number;
    played: boolean;
    idle: number;
    flash: number;

    aimX: number;
    aimY: number;
    prevX: number;
    prevY: number;
    layoutKey: string;
}

const GRAVITY = 900;
const SPAWN_EVERY = 0.95;
const RAMP = 0.012;
const MAX_RAMP = 2.2;
const TRAIL_LIFE = 0.22;
const COMBO_WINDOW = 0.45;
const SELF_SPEED = 760;

const SELF_REST = 0.88;

const OVER_AUTOPLAY = 2.4;
const IDLE_RESUME = 12;

function newWorld(lives: number): World {
    return {
        pieces: [],
        halves: [],
        trail: [],
        score: 0,
        best: 0,
        combo: 0,
        comboT: 0,
        lives,
        livesSet: lives,
        over: false,
        overT: 0,
        spawnIn: 0,
        played: false,
        idle: 0,
        flash: 0,
        aimX: 0,
        aimY: 0,
        prevX: 0,
        prevY: 0,
        layoutKey: "",
    };
}

interface SliceBladeProps {
    title?: string;
    background?: string;
    ink?: string;
    accent?: string;
    speed?: number;
    bombs?: number;
    lives?: number;
    attract?: boolean;
    style?: React.CSSProperties;
}

export default function SliceBlade(props: SliceBladeProps) {
    const {
        title = "SLICE",
        background = "#000000",
        ink = "#FFFFFF",
        accent = "#ff4d5e",
        speed = 50,
        bombs = 14,
        lives = 3,
        attract = true,
        style,
    } = props;

    const inkC = cssColor(ink);
    const accentC = cssColor(accent);
    const backgroundC = cssColor(background);

    const hostRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const worldRef = useRef<World>(newWorld(lives));
    const rafRef = useRef<number | null>(null);
    const lastRef = useRef(0);
    const hoverRef = useRef(false);

    const strokeRef = useRef<number[]>([]);
    const restartRef = useRef(false);

    const cfg = useRef({ title, ink: inkC, accent: accentC, background: backgroundC, speed, bombs, lives, attract });
    useLayoutEffect(() => {
        cfg.current = { title, ink: inkC, accent: accentC, background: backgroundC, speed, bombs, lives, attract };
    }, [title, inkC, accentC, backgroundC, speed, bombs, lives, attract]);

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        if (!host || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = 0;
        let h = 0;

        const measure = (): boolean => {
            const cw = Math.max(1, canvas.clientWidth || host.offsetWidth);
            const ch = Math.max(1, canvas.clientHeight || host.offsetHeight);
            if (cw === w && ch === h) return false;
            w = cw;
            h = ch;
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            return true;
        };

        const gpx = () => Math.max(2, Math.min(w, h) * 0.017);
        const radius = () => (gpx() * GH) / 2 + 4;

        const ramp = (world: World) => Math.min(MAX_RAMP, 1 + RAMP * world.score);

        const throwOne = (world: World, apex: number) => {
            const g = GRAVITY;
            const rise = h * apex;
            const vy = -Math.sqrt(2 * g * rise);
            const cs = chars(cfg.current.title, "SLICE");
            const x = w * (0.14 + Math.random() * 0.72);
            world.pieces.push({
                x,
                y: h + radius(),
                vx: (w / 2 - x) * 0.28 + (Math.random() - 0.5) * 90,
                vy,
                rot: Math.random() * 6.283,
                vr: (Math.random() - 0.5) * 3.4,
                ch: cs[Math.floor(Math.random() * cs.length)],
                bomb: Math.random() < Math.max(0, Math.min(60, Math.round(cfg.current.bombs))) / 100,
            });
        };

        const wave = (world: World) => {
            const n = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < n; i++) throwOne(world, 0.5 + Math.random() * 0.24);
        };

        const restart = (world: World) => {
            world.best = Math.max(world.best, world.score);
            world.score = 0;
            world.combo = 0;
            world.comboT = 0;
            world.lives = Math.max(1, Math.round(cfg.current.lives));
            world.livesSet = world.lives;
            world.over = false;
            world.overT = 0;
            world.pieces = [];
            world.halves = [];
            world.trail = [];
            world.spawnIn = SPAWN_EVERY;

            wave(world);
            for (const p of world.pieces) {
                const t = 0.35 + Math.random() * 0.3;
                p.x += p.vx * t;
                p.y += p.vy * t + 0.5 * GRAVITY * t * t;
                p.vy += GRAVITY * t;
                p.rot += p.vr * t;
            }
        };

        const layout = (world: World, force: boolean) => {
            const key = cfg.current.title + "|" + Math.round(w) + "x" + Math.round(h);
            if (!force && key === world.layoutKey) return;
            world.layoutKey = key;
            restart(world);
        };

        const cut = (world: World, i: number, ang: number) => {
            const p = world.pieces[i];
            world.pieces.splice(i, 1);

            if (p.bomb) {
                world.lives--;
                world.flash = 1;
                world.combo = 0;
                if (world.lives <= 0) {
                    world.over = true;
                    world.overT = 0;
                    world.best = Math.max(world.best, world.score);
                }
                return;
            }

            world.comboT = COMBO_WINDOW;
            world.combo++;
            world.score += world.combo;

            const nx = Math.cos(ang + Math.PI / 2);
            const ny = Math.sin(ang + Math.PI / 2);
            const kick = 150 + Math.random() * 90;
            for (let s = 0 as 0 | 1; s <= 1; s++) {
                const sign = s === 0 ? -1 : 1;
                world.halves.push({
                    x: p.x,
                    y: p.y,
                    vx: p.vx + nx * kick * sign,
                    vy: p.vy + ny * kick * sign,
                    rot: p.rot,
                    vr: p.vr + sign * 2.2,
                    ch: p.ch,

                    cutA: ang - p.rot,
                    side: s as 0 | 1,
                    life: 1.4,
                });
            }
        };

        const sweep = (world: World, ax: number, ay: number, bx: number, by: number) => {
            const r = radius();
            for (let i = world.pieces.length - 1; i >= 0; i--) {
                const p = world.pieces[i];
                if (segDist(ax, ay, bx, by, p.x, p.y) > r) continue;
                cut(world, i, Math.atan2(by - ay, bx - ax));
            }
        };

        const step = (dt: number) => {
            const world = worldRef.current;
            const mul = cfg.current.speed / 50;

            if (hoverRef.current) {
                world.played = true;
                world.idle = 0;
            }
            world.idle += dt;
            if (world.idle > IDLE_RESUME) world.played = false;
            if (!cfg.current.attract) world.played = true;

            const stroke = strokeRef.current;

            if (mul <= 0) {
                stroke.length = 0;
                return;
            }

            if (world.flash > 0) world.flash = Math.max(0, world.flash - dt * 3);
            if (world.comboT > 0) {
                world.comboT -= dt;
                if (world.comboT <= 0) world.combo = 0;
            }

            const wantLives = Math.max(1, Math.round(cfg.current.lives));
            if (wantLives !== world.livesSet) {
                world.livesSet = wantLives;
                if (world.lives > 0) world.lives = wantLives;
            }

            for (let i = 2; i < world.trail.length; i += 3) world.trail[i] += dt;
            while (world.trail.length && world.trail[2] > TRAIL_LIFE) world.trail.splice(0, 3);

            if (world.over) {
                stroke.length = 0;
                world.overT += dt;

                for (const q of world.halves) {
                    q.vy += GRAVITY * mul * dt;
                    q.x += q.vx * mul * dt;
                    q.y += q.vy * mul * dt;
                    q.rot += q.vr * mul * dt;
                    q.life -= dt;
                }
                const auto = cfg.current.attract && !world.played && world.overT > OVER_AUTOPLAY;
                if (restartRef.current || auto) {
                    restartRef.current = false;
                    restart(world);
                }
                return;
            }
            restartRef.current = false;

            const g = GRAVITY * mul;
            for (const p of world.pieces) {
                p.vy += g * dt;
                p.x += p.vx * mul * dt;
                p.y += p.vy * mul * dt;
                p.rot += p.vr * mul * dt;
            }
            for (const q of world.halves) {
                q.vy += g * dt;
                q.x += q.vx * mul * dt;
                q.y += q.vy * mul * dt;
                q.rot += q.vr * mul * dt;
                q.life -= dt;
            }

            const r = radius();
            for (let i = world.pieces.length - 1; i >= 0; i--)
                if (world.pieces[i].y - r > h + 40) world.pieces.splice(i, 1);
            for (let i = world.halves.length - 1; i >= 0; i--)
                if (world.halves[i].life <= 0 || world.halves[i].y - r > h + 60) world.halves.splice(i, 1);

            world.spawnIn -= dt * mul * ramp(world);
            if (world.spawnIn <= 0) {
                world.spawnIn = SPAWN_EVERY;
                wave(world);
            }

            if (world.played) {
                for (let i = 0; i + 1 < stroke.length; i += 2) {
                    const ax = i === 0 ? world.prevX : stroke[i - 2];
                    const ay = i === 0 ? world.prevY : stroke[i - 1];
                    const bx = stroke[i];
                    const by = stroke[i + 1];
                    world.trail.push(bx, by, 0);
                    if (ax || ay) sweep(world, ax, ay, bx, by);
                    world.prevX = bx;
                    world.prevY = by;
                }
                stroke.length = 0;
            } else {
                stroke.length = 0;

                let best: Piece | null = null;
                let bs = -Infinity;
                for (const p of world.pieces) {
                    if (p.y > h * 0.72) continue;
                    const s = -Math.abs(p.vy) - Math.abs(p.x - world.aimX) * 0.35;
                    if (s > bs) {
                        bs = s;
                        best = p;
                    }
                }
                const tx = best ? best.x : w / 2;
                const ty = best ? best.y : h * SELF_REST;
                const px = world.aimX;
                const py = world.aimY;
                const dx = tx - px;
                const dy = ty - py;
                const d = Math.hypot(dx, dy);
                const stepLen = Math.min(d, SELF_SPEED * mul * dt);
                if (d > 0.001) {
                    world.aimX = px + (dx / d) * stepLen;
                    world.aimY = py + (dy / d) * stepLen;
                    world.trail.push(world.aimX, world.aimY, 0);
                    sweep(world, px, py, world.aimX, world.aimY);
                }
                world.prevX = world.aimX;
                world.prevY = world.aimY;
            }
        };

        const paintHalf = (q: Half, px: number, col: string) => {
            const R = px * GH * 1.2;
            ctx.save();
            ctx.translate(q.x, q.y);
            ctx.rotate(q.rot);
            ctx.beginPath();
            ctx.save();
            ctx.rotate(q.cutA);
            ctx.rect(-R, q.side === 0 ? -R : 0, 2 * R, R);
            ctx.restore();
            ctx.clip();
            ctx.fillStyle = col;
            drawGlyph(ctx, q.ch, 0, 0, px);
            ctx.restore();
        };

        const paint = () => {
            const world = worldRef.current;
            const c = cfg.current;
            const px = gpx();
            const u = Math.min(w, h);

            ctx.globalAlpha = 1;
            ctx.fillStyle = c.background;
            ctx.fillRect(0, 0, w, h);

            for (const q of world.halves) {
                ctx.globalAlpha = Math.max(0, Math.min(1, q.life / 0.6));
                paintHalf(q, px, c.ink);
            }
            ctx.globalAlpha = 1;

            for (const p of world.pieces) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                if (p.bomb) {
                    ctx.fillStyle = c.accent;
                    ctx.beginPath();
                    ctx.arc(0, 0, px * GH * 0.42, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = c.background;
                    drawGlyph(ctx, "X", 0, 0, px * 0.62);
                    ctx.strokeStyle = c.accent;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(0, -px * GH * 0.42);
                    ctx.lineTo(px * 1.6, -px * GH * 0.72);
                    ctx.stroke();
                } else {
                    ctx.fillStyle = c.ink;
                    drawGlyph(ctx, p.ch, 0, 0, px);
                }
                ctx.restore();
            }

            const tr = world.trail;
            if (tr.length >= 6) {
                ctx.strokeStyle = c.accent;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                for (let i = 3; i < tr.length; i += 3) {
                    const age = tr[i + 2];
                    const k = Math.max(0, 1 - age / TRAIL_LIFE);
                    ctx.globalAlpha = k * 0.9;
                    ctx.lineWidth = Math.max(1, u * 0.014 * k);
                    ctx.beginPath();
                    ctx.moveTo(tr[i - 3], tr[i - 2]);
                    ctx.lineTo(tr[i], tr[i + 1]);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
                ctx.lineCap = "butt";
                ctx.lineJoin = "miter";
            }

            if (world.over) {
                const bp = Math.max(4, Math.min(10, Math.round(w / 150)));
                const s = "GAME OVER";
                ctx.globalAlpha = 1;
                ctx.fillStyle = c.accent;
                drawText(ctx, s, (w - textWidth(s, bp)) / 2, h / 2 - GH * bp, bp);
                const sub = "SCORE " + world.score;
                const spx = Math.max(2, Math.round(bp / 2));
                ctx.globalAlpha = 0.6;
                ctx.fillStyle = c.ink;
                drawText(ctx, sub, (w - textWidth(sub, spx)) / 2, h / 2 + GH * bp * 0.6, spx);
                ctx.globalAlpha = 1;
            }

            if (world.flash > 0) {
                ctx.globalAlpha = world.flash * 0.32;
                ctx.fillStyle = c.accent;
                ctx.fillRect(0, 0, w, h);
                ctx.globalAlpha = 1;
            }
        };

        measure();
        layout(worldRef.current, true);
        worldRef.current.aimX = w / 2;
        worldRef.current.aimY = h * 0.8;

        paint();

        const ro = new ResizeObserver(() => {
            if (measure()) {
                layout(worldRef.current, true);
                paint();
            }
        });
        ro.observe(host);

        lastRef.current = 0;
        const frame = (now: number) => {
            const prev = lastRef.current || now;
            lastRef.current = now;
            const dt = Math.min(0.05, (now - prev) / 1000);
            layout(worldRef.current, false);
            if (dt > 0) step(dt);
            paint();
            rafRef.current = requestAnimationFrame(frame);
        };
        rafRef.current = requestAnimationFrame(frame);

        return () => {
            ro.disconnect();
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };

    }, []);

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        if (!host || !canvas) return;

        const takeOver = () => {
            const world = worldRef.current;
            world.played = true;
            world.idle = 0;
        };
        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();

            if (rect.width <= 0 || rect.height <= 0) return;
            const x = ((e.clientX - rect.left) / rect.width) * canvas.clientWidth;
            const y = ((e.clientY - rect.top) / rect.height) * canvas.clientHeight;
            const q = strokeRef.current;
            q.push(x, y);

            if (q.length > 64) q.splice(0, q.length - 64);
            takeOver();
        };
        const onDown = (e: PointerEvent) => {
            restartRef.current = true;
            onMove(e);
        };
        const onEnter = () => {
            hoverRef.current = true;
            takeOver();
        };
        const onLeave = () => {
            hoverRef.current = false;

            worldRef.current.prevX = 0;
            worldRef.current.prevY = 0;
        };

        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerdown", onDown);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);
        return () => {
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerdown", onDown);
            host.removeEventListener("pointerenter", onEnter);
            host.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return (
        <div
            ref={hostRef}
            tabIndex={0}
            style={{
                position: "relative",
                minWidth: 1200,
                minHeight: 800,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: backgroundC,
                touchAction: "none",
                outline: "none",
                ...style,
            }}
        >
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair" }} />
        </div>
    );
}
