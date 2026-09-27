// Metal Rosette — Originkit

"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

const DPR_CAP = 2

const CELL = 1

const CYCLE_SEC_AT_50 = 3.45

const F_EXPAND = 0.31
const F_COLLAPSE = 0.29
const F_REST = 0.4

const YAW_DEG = 45

const FOV_DEG = 28

const TAU = Math.PI * 2

const VERT = `
precision highp float;
attribute vec3 aPos;
attribute vec3 aNrm;
attribute vec3 aArm;
uniform float uSpin;
uniform float uYaw;
uniform float uPitch;
uniform float uRoll;
uniform float uDist;
uniform float uFov;
uniform float uTravel;
uniform float uAspect;
varying vec3 vN;
varying vec3 vP;
vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 rotZ(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }
void main() {
  vec3 pw = rotY(aPos + aArm * uTravel, uSpin);
  vN = rotY(aNrm, uSpin);
  vP = pw;
  vec3 v = rotX(rotY(pw, -uYaw), uPitch);
  v.z -= uDist;
  v = rotZ(v, uRoll);
  float f = 1.0 / tan(uFov * 0.5);
  float zn = 0.05;
  float zf = 200.0;
  gl_Position = vec4(
    v.x * f / uAspect,
    v.y * f,
    ((zf + zn) / (zn - zf)) * v.z + (2.0 * zf * zn) / (zn - zf),
    -v.z
  );
}
`

const FRAG = `
precision highp float;
varying vec3 vN;
varying vec3 vP;
uniform vec3 uCamPos;
uniform vec3 uBase;
uniform float uRough;
uniform float uReflect;

const float PI = 3.14159265359;

const vec3 SKY_LOW = vec3(0.30, 0.35, 0.47);
const vec3 SKY_HIGH = vec3(0.80, 0.84, 0.95);
const vec3 GROUND_DEEP = vec3(0.0035, 0.0038, 0.0050);
const vec3 GROUND_NEAR = vec3(0.052, 0.055, 0.066);
const vec3 HORIZON = vec3(0.55, 0.53, 0.49);

const vec3 BOX_A_DIR = vec3(-0.5774, 0.5774, -0.5774);
const vec3 BOX_B_DIR = vec3(0.5774, -0.5774, -0.5774);
const vec3 BOX_C_DIR = vec3(-0.5774, -0.5774, 0.5774);
const vec3 BOX_A = vec3(1.90, 1.90, 1.96);
const vec3 BOX_B = vec3(1.30, 1.26, 1.20);
const vec3 BOX_C = vec3(1.00, 1.03, 1.12);

float boxLobe(vec3 R, vec3 d, float sharp) {
  return pow(max(dot(R, d), 0.0), sharp);
}

vec3 envSample(vec3 R, float r) {
  float t = clamp(R.y * 0.5 + 0.5, 0.0, 1.0);

  vec3 ground = mix(GROUND_DEEP, GROUND_NEAR, smoothstep(-0.85, -0.02, R.y));
  vec3 sky = mix(SKY_LOW, SKY_HIGH, smoothstep(0.02, 0.90, R.y));

  float e = 0.006 + 0.45 * r * r;
  vec3 c = mix(ground, sky, smoothstep(0.5 - e, 0.5 + e, t));
  c += HORIZON * exp(-(R.y * R.y) / (0.004 + 0.30 * r * r)) * (1.0 - 0.6 * r);
  c += BOX_A * boxLobe(R, BOX_A_DIR, mix(500.0, 5.0, r));
  c += BOX_B * boxLobe(R, BOX_B_DIR, mix(260.0, 4.0, r));
  c += BOX_C * boxLobe(R, BOX_C_DIR, mix(200.0, 3.0, r));
  return c;
}

float dGGX(float NoH, float a) {
  float a2 = a * a;
  float d = NoH * NoH * (a2 - 1.0) + 1.0;
  return a2 / (PI * d * d);
}

float vSmith(float NoV, float NoL, float a) {
  float a2 = a * a;
  float gv = NoL * sqrt(NoV * NoV * (1.0 - a2) + a2);
  float gl = NoV * sqrt(NoL * NoL * (1.0 - a2) + a2);
  return 0.5 / max(gv + gl, 1e-5);
}

vec3 fSchlick(vec3 f0, float u) { return f0 + (1.0 - f0) * pow(1.0 - u, 5.0); }

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 srgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

vec3 lightTerm(vec3 N, vec3 V, vec3 L, vec3 f0, float a, vec3 col) {
  vec3 H = normalize(L + V);
  float NoL = max(dot(N, L), 0.0);
  float NoV = max(dot(N, V), 1e-4);
  float NoH = max(dot(N, H), 0.0);
  float VoH = max(dot(V, H), 0.0);
  return dGGX(NoH, a) * vSmith(NoV, NoL, a) * fSchlick(f0, VoH) * col * NoL;
}

void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(uCamPos - vP);
  float r = clamp(uRough, 0.03, 1.0);
  float a = r * r;
  vec3 f0 = clamp(uBase * uReflect, vec3(0.0), vec3(1.0));
  float NoV = max(dot(N, V), 1e-4);
  vec3 R = reflect(-V, N);
  vec3 Fe = f0 + (max(vec3(1.0 - r), f0) - f0) * pow(1.0 - NoV, 5.0);
  vec3 col = envSample(R, r) * Fe;

  col += lightTerm(N, V, BOX_A_DIR, f0, a, vec3(0.55, 0.55, 0.57));
  col += lightTerm(N, V, BOX_B_DIR, f0, a, vec3(0.22, 0.21, 0.20));
  gl_FragColor = vec4(srgb(aces(col)), 1.0);
}
`

type V3 = [number, number, number]

const ARMS: V3[] = [
  [0, 0, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

const CHAMFER = 0.09

const FACES: { n: V3; u: V3; v: V3 }[] = [
  { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
  { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
]

const CORNERS: [number, number][] = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
]

const norm = (v: V3): V3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

export function buildRosette() {
  const pos: number[] = []
  const nrm: number[] = []
  const arm: number[] = []
  const idx: number[] = []
  const h = CELL * 0.5
  const c = h * CHAMFER
  const i = h - c

  for (const a of ARMS) {
    const facet = (verts: V3[], n: V3) => {
      const [p0, p1, p2] = verts
      const e1: V3 = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]]
      const e2: V3 = [p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]]
      const g: V3 = [
        e1[1] * e2[2] - e1[2] * e2[1],
        e1[2] * e2[0] - e1[0] * e2[2],
        e1[0] * e2[1] - e1[1] * e2[0],
      ]
      const ordered =
        g[0] * n[0] + g[1] * n[1] + g[2] * n[2] >= 0 ? verts : verts.slice().reverse()
      const base = pos.length / 3
      for (const v of ordered) {
        pos.push(v[0], v[1], v[2])
        nrm.push(n[0], n[1], n[2])
        arm.push(a[0], a[1], a[2])
      }
      for (let k = 1; k < ordered.length - 1; k++) idx.push(base, base + k, base + k + 1)
    }

    for (const f of FACES) {
      facet(
        CORNERS.map(
          ([cu, cv]): V3 => [
            f.n[0] * h + f.u[0] * i * cu + f.v[0] * i * cv,
            f.n[1] * h + f.u[1] * i * cu + f.v[1] * i * cv,
            f.n[2] * h + f.u[2] * i * cu + f.v[2] * i * cv,
          ]
        ),
        f.n
      )
    }

    for (let ax = 0; ax < 3; ax++) {
      for (let bx = ax + 1; bx < 3; bx++) {
        const wx = 3 - ax - bx
        for (const sa of [-1, 1]) {
          for (const sb of [-1, 1]) {
            const at = (av: number, bv: number, wv: number): V3 => {
              const p: V3 = [0, 0, 0]
              p[ax] = av
              p[bx] = bv
              p[wx] = wv
              return p
            }
            const n: V3 = [0, 0, 0]
            n[ax] = sa
            n[bx] = sb
            facet(
              [
                at(sa * h, sb * i, i),
                at(sa * i, sb * h, i),
                at(sa * i, sb * h, -i),
                at(sa * h, sb * i, -i),
              ],
              norm(n)
            )
          }
        }
      }
    }

    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (const sz of [-1, 1]) {
          facet(
            [
              [sx * h, sy * i, sz * i],
              [sx * i, sy * h, sz * i],
              [sx * i, sy * i, sz * h],
            ],
            norm([sx, sy, sz])
          )
        }
      }
    }
  }

  return {
    pos: new Float32Array(pos),
    nrm: new Float32Array(nrm),
    arm: new Float32Array(arm),
    idx: new Uint16Array(idx),
  }
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeIn = (t: number) => t * t * t

export function armExtension(u: number, hold: number): number {
  const h = Math.min(Math.max(hold, 0), 1)
  const rem = 1 - h
  if (rem <= 1e-6) return 1
  const tRest = rem * F_REST
  const tExp = rem * F_EXPAND
  const tCol = rem * F_COLLAPSE
  const p = u - Math.floor(u)
  if (p < tRest) return 0
  if (p < tRest + tExp) return easeOut((p - tRest) / tExp)
  if (p < tRest + tExp + h) return 1
  return 1 - easeIn(Math.min((p - tRest - tExp - h) / tCol, 1))
}

export function parseLinearColor(css: string, fallback: V3): V3 {
  const s = (css || "").trim()
  if (!s) return fallback
  const varMatch = s.match(/^var\([^,]+,\s*(.+)\)$/i)
  if (varMatch) return parseLinearColor(varMatch[1], fallback)
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const hex = s.match(/^#([0-9a-f]{3,8})$/i)
  if (hex) {
    let d = hex[1]
    if (d.length === 3 || d.length === 4) d = d.split("").map((c) => c + c).join("")
    if (d.length >= 6) {
      return [
        toLinear(parseInt(d.slice(0, 2), 16) / 255),
        toLinear(parseInt(d.slice(2, 4), 16) / 255),
        toLinear(parseInt(d.slice(4, 6), 16) / 255),
      ]
    }
    return fallback
  }
  const rgb = s.match(/^rgba?\(([^)]+)\)$/i)
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean)
    if (parts.length >= 3) {
      const ch = (t: string) =>
        t.endsWith("%") ? parseFloat(t) / 100 : parseFloat(t) / 255
      return [toLinear(ch(parts[0])), toLinear(ch(parts[1])), toLinear(ch(parts[2]))]
    }
    return fallback
  }
  const hsl = s.match(/^hsla?\(([^)]+)\)$/i)
  if (hsl) {
    const parts = hsl[1].split(/[\s,/]+/).filter(Boolean)
    if (parts.length >= 3) {
      const hDeg = ((parseFloat(parts[0]) % 360) + 360) % 360
      const sat = parseFloat(parts[1]) / 100
      const lig = parseFloat(parts[2]) / 100
      const c = (1 - Math.abs(2 * lig - 1)) * sat
      const x = c * (1 - Math.abs(((hDeg / 60) % 2) - 1))
      const m = lig - c / 2
      const seg = Math.floor(hDeg / 60) % 6
      const table: V3[] = [
        [c, x, 0],
        [x, c, 0],
        [0, c, x],
        [0, x, c],
        [x, 0, c],
        [c, 0, x],
      ]
      const t = table[seg]
      return [toLinear(t[0] + m), toLinear(t[1] + m), toLinear(t[2] + m)]
    }
    return fallback
  }
  return fallback
}

interface MaterialProps {
  roughness: number
  reflect: number
}
interface MotionProps {
  spin: number
  travel: number
  hold: number
}
interface CameraProps {
  tilt: number
  sideTilt: number
}

interface Props {
  background: string
  baseColor: string
  speed: number
  distance: number
  material: Partial<MaterialProps>
  motion: Partial<MotionProps>
  camera: Partial<CameraProps>
  style?: React.CSSProperties
}

const DEF_MATERIAL: MaterialProps = { roughness: 18, reflect: 90 }
const DEF_MOTION: MotionProps = { spin: 18, travel: 100, hold: 48 }
const DEF_CAMERA: CameraProps = { tilt: 35, sideTilt: 0 }

const DEF_BASE_LINEAR: V3 = [0.68, 0.71, 0.75]

function __OriginkitBase_MetalRosette(props: Partial<Props>) {
  const {
    background = "#000000",
    baseColor = "#A5A5A5",
    speed = 50,
    distance = 30,
    style,
  } = props

  const material = { ...DEF_MATERIAL, ...(props.material || {}) }
  const motion = { ...DEF_MOTION, ...(props.motion || {}) }
  const camera = { ...DEF_CAMERA, ...(props.camera || {}) }

  const hostRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const live = useRef({
    baseColor,
    speed,
    distance,
    roughness: material.roughness,
    reflect: material.reflect,
    spin: motion.spin,
    travel: motion.travel,
    hold: motion.hold,
    tilt: camera.tilt,
    sideTilt: camera.sideTilt,
  })
  live.current = {
    baseColor,
    speed,
    distance,
    roughness: material.roughness,
    reflect: material.reflect,
    spin: motion.spin,
    travel: motion.travel,
    hold: motion.hold,
    tilt: camera.tilt,
    sideTilt: camera.sideTilt,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: true,
    }) as WebGLRenderingContext | null
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("MetalRosette shader:", gl.getShaderInfoLog(sh))
      }
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("MetalRosette link:", gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const geo = buildRosette()
    const mkBuf = (data: Float32Array, name: string, size: number) => {
      const b = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, b)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, name)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
      return b
    }
    mkBuf(geo.pos, "aPos", 3)
    mkBuf(geo.nrm, "aNrm", 3)
    mkBuf(geo.arm, "aArm", 3)
    const ibo = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.idx, gl.STATIC_DRAW)

    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uSpin = U("uSpin")
    const uYaw = U("uYaw")
    const uPitch = U("uPitch")
    const uRoll = U("uRoll")
    const uDist = U("uDist")
    const uFov = U("uFov")
    const uTravel = U("uTravel")
    const uAspect = U("uAspect")
    const uCamPos = U("uCamPos")
    const uBase = U("uBase")
    const uRough = U("uRough")
    const uReflect = U("uReflect")

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LESS)
    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)
    gl.frontFace(gl.CCW)
    gl.clearColor(0, 0, 0, 0)

    let bw = 0
    let bh = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)

      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (w === bw && h === bh) return
      bw = w
      bh = h
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let raf = 0
    let last = -1
    let spinAngle = 0
    let cycle = 0
    const D2R = Math.PI / 180

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)

      const dt = last < 0 ? 0 : Math.min(Math.max((now - last) / 1000, 0), 0.1)
      last = now
      const L = live.current

      spinAngle = (spinAngle + dt * L.spin * D2R) % TAU
      const rate = L.speed / 50
      if (rate > 0) cycle = (cycle + (dt * rate) / CYCLE_SEC_AT_50) % 1

      const ext = rate > 0 ? armExtension(cycle, L.hold / 100) : 1

      resize()
      const pitch = L.tilt * D2R
      const yaw = YAW_DEG * D2R
      const d = L.distance
      gl.uniform1f(uSpin, spinAngle)
      gl.uniform1f(uYaw, yaw)
      gl.uniform1f(uPitch, pitch)
      gl.uniform1f(uRoll, L.sideTilt * D2R)
      gl.uniform1f(uDist, d)
      gl.uniform1f(uFov, FOV_DEG * D2R)
      gl.uniform1f(uTravel, ext * (L.travel / 100) * CELL)
      gl.uniform1f(uAspect, bw / Math.max(bh, 1))
      gl.uniform3f(
        uCamPos,
        Math.sin(yaw) * Math.cos(pitch) * d,
        Math.sin(pitch) * d,
        Math.cos(yaw) * Math.cos(pitch) * d
      )
      const base = parseLinearColor(L.baseColor, DEF_BASE_LINEAR)
      gl.uniform3f(uBase, base[0], base[1], base[2])
      gl.uniform1f(uRough, Math.min(Math.max(L.roughness / 100, 0), 1))
      gl.uniform1f(uReflect, Math.min(Math.max(L.reflect / 100, 0), 1))

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, geo.idx.length, gl.UNSIGNED_SHORT, 0)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()

    }
  }, [])

  return (
    <div
      ref={hostRef}
      style={{
        minWidth: 1200,
        minHeight: 800,
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  )
}

const __originkitPresetProps = {
  "material": {
    "reflect": 50,
    "roughness": 100
  },
  "motion": {
    "hold": 48,
    "spin": 90,
    "travel": 178
  },
  "camera": {
    "tilt": 35,
    "sideTilt": 0
  }
};

export default function MetalRosette(props: Record<string, unknown>) {
  return <__OriginkitBase_MetalRosette {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
