const FILTER_CONFIG = {
  haduri: {
    noiseAmount: 28,

    vignette: 0.22,
  },

  dreamPOP: {
    rgbSplit: 5,

    noiseAmount: 18,
  },

  y2k: {
    noiseAmount: 30, // 15~50
    posterizeLevels: 6, // 4~8
    flash: 0.1, // 0~0.2
    vignette: 0.18, // 0~0.3
    rgbSplit: 1.5, // 0~3
  },

  fisheye: {
    strength: 1.2, // 핵심! 1.0~1.8 정도
    zoom: 1.15, // 1.0~1.5
    vignette: 0.52, // 0~0.6
    radius: 0.46, // 0.42~0.5
  },
};

const FRAME_CONFIG = {
  "4cut": {
    width: 900,
    height: 2200,

    frames: [
      {
        key: "black",
        label: "Black",
        src: "/frames/4cut_black.png",

        slots: [
          { x: 51, y: 54, w: 799, h: 420, radius: 0 },
          { x: 51, y: 514, w: 799, h: 420, radius: 0 },
          { x: 51, y: 974, w: 799, h: 420, radius: 0 },
          { x: 51, y: 1434, w: 799, h: 420, radius: 0 },
        ],
      },

      {
        key: "white",
        label: "White",
        src: "/frames/4cut_white.png",

        slots: [
          { x: 51, y: 54, w: 799, h: 420, radius: 0 },
          { x: 51, y: 514, w: 799, h: 420, radius: 0 },
          { x: 51, y: 974, w: 799, h: 420, radius: 0 },
          { x: 51, y: 1434, w: 799, h: 420, radius: 0 },
        ],
      },

      {
        key: "sky",
        label: "Sky",
        src: "/frames/4cut_sky.png",
        slots: [
          { x: 51, y: 54, w: 799, h: 420, radius: 0 },
          { x: 51, y: 514, w: 799, h: 420, radius: 0 },
          { x: 51, y: 974, w: 799, h: 420, radius: 0 },
          { x: 51, y: 1434, w: 799, h: 420, radius: 0 },
        ],
      },
      ...["blue", "green", "pink", "yellow", "purple"].map((color) => ({
        key: color,
        label: color[0].toUpperCase() + color.slice(1),
        src: `/frames/4cut_${color}.png`,
        slots: [
          { x: 51, y: 54, w: 799, h: 420, radius: 0 },
          { x: 51, y: 514, w: 799, h: 420, radius: 0 },
          { x: 51, y: 974, w: 799, h: 420, radius: 0 },
          { x: 51, y: 1434, w: 799, h: 420, radius: 0 },
        ],
      })),

      {
        key: "whitestar",
        label: "White Star",
        src: "/frames/4cut_whitestar.png",
        slots: [
          { x: 51, y: 54, w: 799, h: 420, radius: 0 },
          { x: 51, y: 514, w: 799, h: 420, radius: 0 },
          { x: 51, y: 974, w: 799, h: 420, radius: 0 },
          { x: 51, y: 1434, w: 799, h: 420, radius: 0 },
        ],
      },
      {
        key: "blackdot",
        label: "Black Dot",
        src: "/frames/4cut_blackdot.png",
        slots: [
          { x: 51, y: 54, w: 799, h: 420, radius: 0 },
          { x: 51, y: 514, w: 799, h: 420, radius: 0 },
          { x: 51, y: 974, w: 799, h: 420, radius: 0 },
          { x: 51, y: 1434, w: 799, h: 420, radius: 0 },
        ],
      },
    ],

    previewRatio: "9 / 22",
  },

  "4cutFull": {
    width: 900,
    height: 2674,
    frames: [
      {
        key: "black-full",
        label: "Black Full",
        src: "/frames/4cut_black_full.png",
        slots: [
          { x: 22, y: 22, w: 857, h: 641, radius: 0 },
          { x: 22, y: 685, w: 857, h: 641, radius: 0 },
          { x: 22, y: 1348, w: 857, h: 641, radius: 0 },
          { x: 22, y: 2011, w: 857, h: 641, radius: 0 },
        ],
      },
    ],
    previewRatio: "9 / 27",
  },

  "3cut": {
    width: 900,
    height: 1800,

    frames: [
      {
        key: "oval-black",
        label: "Oval Black",
        src: "/frames/3cut_black_oval.png",

        slots: [
          { x: 68, y: 66, w: 765, h: 437, oval: true },
          { x: 68, y: 543, w: 765, h: 437, oval: true },
          { x: 68, y: 1020, w: 765, h: 437, oval: true },
        ],
      },

      {
        key: "bluedot",
        label: "Blue Dot",
        src: "/frames/3cut_bluedot.png",
        slots: [
          { x: 68, y: 66, w: 765, h: 437, oval: true },
          { x: 68, y: 543, w: 765, h: 437, oval: true },
          { x: 68, y: 1020, w: 765, h: 437, oval: true },
        ],
      },
      {
        key: "pinkdot",
        label: "Pink Dot",
        src: "/frames/3cut_pinkdot.png",
        slots: [
          { x: 68, y: 66, w: 765, h: 437, oval: true },
          { x: 68, y: 543, w: 765, h: 437, oval: true },
          { x: 68, y: 1020, w: 765, h: 437, oval: true },
        ],
      },

      {
        key: "sky",
        label: "Sky Oval",
        src: "/frames/3cut_sky.png",
        slots: [
          { x: 68, y: 66, w: 765, h: 437, oval: true },
          { x: 68, y: 543, w: 765, h: 437, oval: true },
          { x: 68, y: 1020, w: 765, h: 437, oval: true },
        ],
      },
    ],

    previewRatio: "9 / 18",
  },

  princess3cut: {
    width: 900,
    height: 2200,

    frames: [
      {
        key: "princess",
        label: "Princess",
        src: "/frames/3cut_princess.png",
        slots: [
          { x: 51, y: 44, w: 799, h: 571, radius: 0 },
          { x: 51, y: 659, w: 799, h: 571, radius: 0 },
          { x: 51, y: 1274, w: 799, h: 571, radius: 0 },
        ],
      },
      {
        key: "kimdokrae",
        label: "Kimdokrae",
        src: "/frames/3cut_kimdokrae.png",
        slots: [
          { x: 51, y: 44, w: 799, h: 571, radius: 0 },
          { x: 51, y: 659, w: 799, h: 571, radius: 0 },
          { x: 51, y: 1274, w: 799, h: 571, radius: 0 },
        ],
      },
      {
        key: "catofqueen",
        label: "Cat of Queen",
        src: "/frames/3cut_catofqueen.png",
        slots: [
          { x: 51, y: 44, w: 799, h: 571, radius: 0 },
          { x: 51, y: 659, w: 799, h: 571, radius: 0 },
          { x: 51, y: 1274, w: 799, h: 571, radius: 0 },
        ],
      },
    ],

    previewRatio: "9 / 22",
  },

  grid45: {
    width: 1160,
    height: 1460,

    frames: [
      {
        key: "sky",
        label: "Sky Grid",
        src: "/frames/grid45_sky.png",

        slots: [
          { x: 36, y: 36, w: 526, h: 676, radius: 22 },
          { x: 598, y: 36, w: 526, h: 676, radius: 22 },
          { x: 36, y: 748, w: 526, h: 676, radius: 22 },
          { x: 598, y: 748, w: 526, h: 676, radius: 22 },
        ],
      },

      {
        key: "black-normal",
        label: "Black Normal",
        src: "/frames/4_5_4cut_black_nomal.png",
        slots: [
          { x: 36, y: 36, w: 526, h: 676, radius: 0 },
          { x: 598, y: 36, w: 526, h: 676, radius: 0 },
          { x: 36, y: 748, w: 526, h: 676, radius: 0 },
          { x: 598, y: 748, w: 526, h: 676, radius: 0 },
        ],
      },
      {
        key: "white-normal",
        label: "White Normal",
        src: "/frames/4_5_4cut_white_nomal.png",
        slots: [
          { x: 36, y: 36, w: 526, h: 676, radius: 0 },
          { x: 598, y: 36, w: 526, h: 676, radius: 0 },
          { x: 36, y: 748, w: 526, h: 676, radius: 0 },
          { x: 598, y: 748, w: 526, h: 676, radius: 0 },
        ],
      },
    ],

    previewRatio: "4 / 5",
  },

  single45: {
    width: 1000,
    height: 1250,

    frames: [
      {
        key: "star",
        label: "Star",
        src: "/frames/single45_star.png",
        overlayMode: "normal",

        slots: [
          {
            x: 0,
            y: 0,
            w: 1000,
            h: 1250,
            radius: 0,
            fit: "cover",
          },
        ],
      },

      {
        key: "paint",
        label: "Paint",
        src: "/frames/single45_paint.png",

        slots: [
          {
            x: 124,
            y: 131,
            w: 835,
            h: 828,
            radius: 0,
          },
        ],
      },

      {
        key: "minihp",
        label: "Mini Homepage",
        src: "/frames/4_5_1cut_minihp.png",
        slots: [{ x: 122, y: 225, w: 743, h: 857, radius: 0 }],
      },
      {
        key: "forest",
        label: "Forest",
        src: "/frames/4_5_1cut_forest.png",
        slots: [{ x: 59, y: 106, w: 882, h: 1038, radius: 0 }],
      },

      {
        key: "queen",
        label: "Queen",
        src: "/frames/4_5_1cut_queen.png",
        slots: [{ x: 136, y: 136, w: 735, h: 931, radius: 0 }],
      },
    ],

    previewRatio: "4 / 5",
  },

  webfull: {
    width: 1440,
    height: 1080,

    frames: [
      {
        key: "window",
        label: "Window",
        src: "/frames/webfull_window.png",

        slots: [
          {
            x: 160,
            y: 274,
            w: 1123,
            h: 597,
            radius: 0,
          },
        ],
      },
    ],

    previewRatio: "4 / 3",
  },
};

const THEME_STYLES = {
  basic: {
    bg: "#fffafc",
    frame: "#f3d8e7",
    header: "#f8b4d9",
    accent: "#8fd5ff",
  },
  haduri: {
    bg: "#fff9ff",
    frame: "#e8d9ff",
    header: "#b5d8ff",
    accent: "#ff9ad6",
  },
  digicam: {
    bg: "#f5f7ff",
    frame: "#bcd8ff",
    header: "#ffe6ad",
    accent: "#8ef0c7",
  },
  sticker: {
    bg: "#fff9fd",
    frame: "#ffd2ec",
    header: "#9fe0ff",
    accent: "#d1ff7a",
  },
  magazine: {
    bg: "#fffef7",
    frame: "#111111",
    header: "#ff5ca8",
    accent: "#ffe95b",
  },
  paint: {
    bg: "#f8fbff",
    frame: "#c7d4ff",
    header: "#ffb9cb",
    accent: "#bfffa2",
  },
};

const imageCache = new Map();

function loadImage(src) {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };

    img.onerror = reject;
    img.src = src;
  });
}

function applyFilterSettings(ctx, filterName, width, height, controls = {}) {
  const blurPx = controls.blur || 0;
  let filter = `blur(${blurPx}px)`;

  switch (filterName) {
    case "B&W":
    case "bw":
    case "blackwhite":
    case "black&White":
      filter += " grayscale(1) contrast(1.18) brightness(1.02)";
      break;

    case "haduri":
      filter += " brightness(1.18) contrast(1.20) saturate(1.0)";
      break;

    case "dream POP":
      filter += " brightness(1.12) contrast(1.16) saturate(1.65)";
      break;

    case "y2k":
      filter += " contrast(1.08) saturate(1.08) brightness(1.03)";
      break;

    case "fisheye":
      filter += " contrast(1.05) saturate(1.04)";
      break;

    default:
      filter += " brightness(1)";
  }

  ctx.filter = filter;
}

function isBwFilter(filterName) {
  return (
    filterName === "bw" ||
    filterName === "B&W" ||
    filterName === "blackwhite" ||
    filterName === "blackWhite"
  );
}

function applyManualBW(ctx, x, y, width, height) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  ctx.putImageData(imageData, x, y);
}

function addStrongNoise(ctx, x, y, width, height, amount = 30) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * amount;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }

  ctx.putImageData(imageData, x, y);
}

function addPosterize(ctx, x, y, width, height, levels = 5) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;
  const step = 255 / (levels - 1);

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.round(data[i] / step) * step;
    data[i + 1] = Math.round(data[i + 1] / step) * step;
    data[i + 2] = Math.round(data[i + 2] / step) * step;
  }

  ctx.putImageData(imageData, x, y);
}

function remapBlueMono(ctx, x, y, width, height) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const t = lum / 255;

    let nr, ng, nb;

    if (t < 0.18) {
      // 검정 부분 = 진한 파랑
      nr = 36;
      ng = 68;
      nb = 165;
    } else if (t < 0.6) {
      // 중간톤 = 연파랑
      const k = (t - 0.28) / (0.6 - 0.28);
      nr = 36 + (170 - 36) * k;
      ng = 68 + (205 - 68) * k;
      nb = 165 + (255 - 165) * k;
    } else {
      // 밝은 부분 = 거의 흰색
      const k = (t - 0.6) / 0.4;
      nr = 170 + (248 - 170) * k;
      ng = 205 + (250 - 205) * k;
      nb = 255 + (255 - 255) * k;
    }

    data[i] = Math.max(0, Math.min(255, nr));
    data[i + 1] = Math.max(0, Math.min(255, ng));
    data[i + 2] = Math.max(0, Math.min(255, nb));
  }

  ctx.putImageData(imageData, x, y);
}

function remapGreenMono(ctx, x, y, width, height) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const t = lum / 255;

    let nr, ng, nb;

    if (t < 0.28) {
      // 검정 부분 = 진한 초록
      nr = 28;
      ng = 112;
      nb = 72;
    } else if (t < 0.6) {
      // 중간톤 = 연초록
      const k = (t - 0.28) / (0.6 - 0.28);
      nr = 28 + (150 - 28) * k;
      ng = 112 + (205 - 112) * k;
      nb = 72 + (160 - 72) * k;
    } else {
      // 밝은 부분 = 아이보리/세피아빛
      const k = (t - 0.6) / 0.4;
      nr = 150 + (236 - 150) * k;
      ng = 205 + (230 - 205) * k;
      nb = 160 + (210 - 160) * k;
    }

    data[i] = Math.max(0, Math.min(255, nr));
    data[i + 1] = Math.max(0, Math.min(255, ng));
    data[i + 2] = Math.max(0, Math.min(255, nb));
  }

  ctx.putImageData(imageData, x, y);
}

function addFlashWash(ctx, x, y, width, height, strength = 0.14) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = `rgba(255,255,255,${strength})`;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}

function addRgbSplitGhost(ctx, x, y, width, height, offset = 2) {
  const src = ctx.getImageData(x, y, width, height);
  const out = ctx.createImageData(width, height);

  for (let yy = 0; yy < height; yy++) {
    for (let xx = 0; xx < width; xx++) {
      const i = (yy * width + xx) * 4;

      const rx = Math.min(width - 1, Math.max(0, xx + offset));
      const bx = Math.min(width - 1, Math.max(0, xx - offset));

      const ri = (yy * width + rx) * 4;
      const bi = (yy * width + bx) * 4;

      out.data[i] = src.data[ri];
      out.data[i + 1] = src.data[i + 1];
      out.data[i + 2] = src.data[bi + 2];
      out.data[i + 3] = src.data[i + 3];
    }
  }

  ctx.putImageData(out, x, y);
}

function addSlotVignette(ctx, slot, strength = 0.28) {
  const cx = slot.x + slot.w / 2;
  const cy = slot.y + slot.h / 2;
  const r = Math.max(slot.w, slot.h) * 0.72;

  const grad = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.72, "rgba(0,0,0,0)");
  grad.addColorStop(1, `rgba(0,0,0,${strength})`);

  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
  ctx.restore();
}

function addGrain(ctx, width, height, amount = 0) {
  if (!amount) return;
  const strength = Math.max(0, Math.min(100, amount));
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const noisePower = strength * 0.8;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * noisePower;
    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawDateStamp(ctx, canvasWidth, canvasHeight, enabled) {
  if (!enabled) return;
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  ctx.save();
  ctx.font = "bold 34px monospace";
  ctx.fillStyle = "#ffb35c";
  ctx.shadowColor = "rgba(0,0,0,.35)";
  ctx.shadowBlur = 2;
  ctx.fillText(`${yy}.${mm}.${dd}`, canvasWidth - 210, canvasHeight - 40);
  ctx.restore();
}

function drawHeader(ctx, width, themeKey, layoutKey) {
  const theme = THEME_STYLES[themeKey] || THEME_STYLES.basic;
  roundRect(ctx, 30, 30, width - 60, 70, 18, true, false);

  ctx.fillStyle = "#2f3c8f";
  ctx.font = "bold 34px Arial";
  ctx.fillText("Hapqy do it - Photo Booth", 60, 77);

  ctx.fillStyle = theme.accent;
  roundRect(ctx, width - 180, 45, 90, 40, 12, true, false);

  ctx.fillStyle = "#63336f";
  ctx.font = "bold 20px Arial";
  ctx.fillText(layoutKey.toUpperCase(), width - 160, 72);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  let r = radius;
  if (typeof r === "number") {
    r = { tl: r, tr: r, br: r, bl: r };
  } else {
    r = { tl: 0, tr: 0, br: 0, bl: 0, ...r };
  }

  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + width - r.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r.tr);
  ctx.lineTo(x + width, y + height - r.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r.br, y + height);
  ctx.lineTo(x + r.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();

  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

async function drawFittedImage(
  ctx,
  src,
  slot,
  filterName,
  controls,
  photoAdjust = {},
) {
  const img = await loadImage(src);

  const imgRatio = img.width / img.height;
  const slotRatio = slot.w / slot.h;

  const baseScale =
    slot.fit === "contain"
      ? imgRatio > slotRatio
        ? slot.w / img.width
        : slot.h / img.height
      : imgRatio > slotRatio
        ? slot.h / img.height
        : slot.w / img.width;

  const scale = baseScale * (photoAdjust.scale || 1);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = slot.x + (slot.w - dw) / 2 + (photoAdjust.x || 0);
  const dy = slot.y + (slot.h - dh) / 2 + (photoAdjust.y || 0);

  ctx.save();

  ctx.beginPath();

  if (slot.oval) {
    ctx.ellipse(
      slot.x + slot.w / 2,
      slot.y + slot.h / 2,
      slot.w / 2,
      slot.h / 2,
      0,
      0,
      Math.PI * 2,
    );
  } else {
    ctx.rect(slot.x, slot.y, slot.w, slot.h);
  }

  ctx.clip();

  ctx.filter = "none";
  if (filterName !== "original") {
    applyFilterSettings(ctx, filterName, slot.w, slot.h, controls);
  }

  if (filterName === "fisheye") {
    drawFisheyeImage(ctx, img, slot, photoAdjust);
    ctx.restore();
    return;
  }

  if (filterName === "haduri") {
    addStrongNoise(ctx, slot.x, slot.y, slot.w, slot.h, 28);

    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgba(120, 145, 170, 0.16)";
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(255, 255, 210, 0.12)";
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
    ctx.restore();

    addSlotVignette(ctx, slot, 0.22);
  }

  if (filterName === "haduri") {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    const scaleDown = 0.6;

    tempCanvas.width = Math.max(1, Math.floor(dw * scaleDown));
    tempCanvas.height = Math.max(1, Math.floor(dh * scaleDown));

    tempCtx.imageSmoothingEnabled = true;
    tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(tempCanvas, dx, dy, dw, dh);
  } else {
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  if (isBwFilter(filterName)) {
    applyManualBW(ctx, slot.x, slot.y, slot.w, slot.h);
  }

  if (filterName === "dream POP") {
    // RGB 분리는 약하게만
    addRgbSplitGhost(ctx, slot.x, slot.y, slot.w, slot.h, 4);

    // 네온 핑크/민트/보라 그라데이션
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const grad = ctx.createLinearGradient(
      slot.x,
      slot.y,
      slot.x + slot.w,
      slot.y + slot.h,
    );

    grad.addColorStop(0, "rgba(255, 80, 190, 0.22)");
    grad.addColorStop(0.35, "rgba(90, 255, 235, 0.18)");
    grad.addColorStop(0.68, "rgba(155, 90, 255, 0.20)");
    grad.addColorStop(1, "rgba(255, 230, 90, 0.14)");

    ctx.fillStyle = grad;
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
    ctx.restore();

    // 밝은 부분을 살짝 반짝이게
    ctx.save();
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
    ctx.restore();

    // 너무 흐려 보이지 않게 비네팅 약하게
    addSlotVignette(ctx, slot, 0.08);
  }

  if (filterName === "haduri") {
    // 1) 전체를 하얗게 날리는 과노출
    ctx.save();

    // 하이라이트 올리기
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);

    // 살짝 차가운 하두리톤
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = "rgba(180,220,255,0.08)";
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);

    ctx.restore();
  }
  ctx.restore();
}

function drawSticker(ctx, sticker, previewW, previewH, canvasW, canvasH) {
  const x = (sticker.x / previewW) * canvasW;
  const y = (sticker.y / previewH) * canvasH;
  const size = (sticker.size / previewW) * canvasW;

  ctx.save();
  ctx.font = `${size}px Arial`;
  ctx.textBaseline = "top";
  ctx.fillText(sticker.char, x, y);
  ctx.restore();
}

async function drawPngSticker(
  ctx,
  sticker,
  previewW,
  previewH,
  canvasW,
  canvasH,
) {
  if (!sticker.src) return;

  const img = await loadImage(sticker.src);

  const x = (sticker.x / previewW) * canvasW;
  const y = (sticker.y / previewH) * canvasH;
  const size = (sticker.size / previewW) * canvasW;

  ctx.save();
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  ctx.restore();
}

async function drawHaduristLogoInSlot(ctx, slot) {
  const logo = await loadImage("/frames/hadurist_logo.png");

  const logoW = slot.w * 0.26;
  const logoH = logoW * (logo.height / logo.width);

  const x = slot.x + slot.w * 0.045;
  const y = slot.y + slot.h * 0.045;

  ctx.save();
  ctx.globalAlpha = 0.92;
  ctx.drawImage(logo, x, y, logoW, logoH);
  ctx.restore();
}

function drawFilmDateStamp(
  ctx,
  dateStamp,
  previewW,
  previewH,
  canvasW,
  canvasH,
) {
  if (!dateStamp) return;

  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const text = `${yy}.${mm}.${dd}`;

  const x = (dateStamp.x / previewW) * canvasW;
  const y = (dateStamp.y / previewH) * canvasH;
  const size = (dateStamp.size / previewW) * canvasW;

  ctx.save();
  ctx.font = `bold ${size}px "Courier New", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "2px";

  ctx.shadowColor = "rgba(255, 150, 30, 0.95)";
  ctx.shadowBlur = size * 0.35;

  ctx.fillStyle = "rgba(255, 178, 48, 0.92)";
  ctx.fillText(text, x, y);

  ctx.restore();
}

export async function composePhotoBooth({
  shots,
  layoutKey,
  frameKey,
  themeKey,
  filterName,
  controls,
  stickers,
  showDate,
  dateStamp,
  drawDateToCanvas = true,
  photoAdjust = { x: 0, y: 0, scale: 1 },
  previewWidth = 360,
  previewHeight = 720,
}) {
  const config = FRAME_CONFIG[layoutKey];
  const frame =
    config.frames.find((item) => item.key === frameKey) || config.frames[0];

  const slots = frame.slots;

  const canvas = document.createElement("canvas");
  canvas.width = config.width;
  canvas.height = config.height;

  const ctx = canvas.getContext("2d");

  // 배경은 일단 투명/흰색 기준
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1) 사진 먼저 슬롯에 그림
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const shotSrc = shots[i] || shots[shots.length - 1];
    if (!shotSrc) continue;

    await drawFittedImage(
      ctx,
      shotSrc,
      slot,
      filterName,
      controls,
      photoAdjust,
    );
  }

  // 여기 추가

  if (filterName === "haduri") {
    for (const slot of slots) {
      await drawHaduristLogoInSlot(ctx, slot);
    }
  }

  // 2) 투명 구멍이 있는 PNG 프레임을 사진 위에 한 번만 덮기
  if (frame.src) {
    const frameImage = await loadImage(frame.src);
    ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
  }

  for (const sticker of stickers) {
    await drawPngSticker(
      ctx,

      sticker,

      previewWidth,

      previewHeight,

      canvas.width,

      canvas.height,
    );
  }

  if (showDate && drawDateToCanvas) {
    drawFilmDateStamp(
      ctx,
      dateStamp,
      previewWidth,
      previewHeight,
      canvas.width,
      canvas.height,
    );
  }

  // 6) 전체 그레인
  if (controls.grain > 0) {
    addGrain(ctx, canvas.width, canvas.height, controls.grain);
  }

  return canvas.toDataURL("image/png");
}

export function getFrameCount(layoutKey) {
  switch (layoutKey) {
    case "3cut":
    case "princess3cut":
      return 3;
    case "single45":
      return 1;
    case "webfull":
      return 1;
    case "id":
      return 1;
    case "4cutFull":
      return 4;
    default:
      return 4;
  }
}

export function getLayoutRatio(layoutKey) {
  return FRAME_CONFIG[layoutKey]?.previewRatio || "9 / 22";
}

function drawFisheyeImage(ctx, img, slot, photoAdjust = {}) {
  const { x, y, w, h } = slot;
  const cfg = FILTER_CONFIG.fisheye;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tctx = tempCanvas.getContext("2d");

  const imgRatio = img.width / img.height;
  const slotRatio = w / h;

  let baseW;
  let baseH;

  if (imgRatio > slotRatio) {
    baseH = h;
    baseW = h * imgRatio;
  } else {
    baseW = w;
    baseH = w / imgRatio;
  }

  const scale = (photoAdjust.scale || 1) * cfg.zoom;
  const drawW = baseW * scale;
  const drawH = baseH * scale;
  const drawX = (w - drawW) / 2 + (photoAdjust.x || 0);
  const drawY = (h - drawH) / 2 + (photoAdjust.y || 0);

  tctx.drawImage(img, drawX, drawY, drawW, drawH);

  const srcData = tctx.getImageData(0, 0, w, h);
  const dstData = tctx.createImageData(w, h);

  const src = srcData.data;
  const dst = dstData.data;

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * cfg.radius;
  const strength = cfg.strength;

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const di = (py * w + px) * 4;

      if (dist > radius) {
        dst[di] = 0;
        dst[di + 1] = 0;
        dst[di + 2] = 0;
        dst[di + 3] = 255;
        continue;
      }

      const nx = dx / radius;
      const ny = dy / radius;
      const r = Math.sqrt(nx * nx + ny * ny);
      const warpedR = Math.pow(r, strength);

      const sx = Math.round(cx + nx * warpedR * radius);
      const sy = Math.round(cy + ny * warpedR * radius);

      const safeX = Math.max(0, Math.min(w - 1, sx));
      const safeY = Math.max(0, Math.min(h - 1, sy));
      const si = (safeY * w + safeX) * 4;

      dst[di] = src[si];
      dst[di + 1] = src[si + 1];
      dst[di + 2] = src[si + 2];
      dst[di + 3] = 255;
    }
  }

  tctx.putImageData(dstData, 0, 0);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(tempCanvas, x, y, w, h);
  ctx.restore();
}
