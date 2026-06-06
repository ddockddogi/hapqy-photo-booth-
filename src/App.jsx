import { useEffect, useMemo, useRef, useState } from "react";
import {
  composePhotoBooth,
  getFrameCount,
  getLayoutRatio,
} from "./utils/canvas";

const FRAME_OPTIONS = {
  "4cut": [
    { key: "black", label: "Black", color: "#111111" },
    { key: "white", label: "White", color: "#ffffff" },
    { key: "sky", label: "Sky", color: "#8fd5ff" },
    { key: "blue", label: "Blue", color: "#69cbd0" },
    { key: "green", label: "Green", color: "#b9ef6b" },
    { key: "pink", label: "Pink", color: "#df5aa0" },
    { key: "yellow", label: "Yellow", color: "#f2d94e" },
    { key: "purple", label: "Purple", color: "#9c82bd" },
  ],

  "4cutFull": [{ key: "black-full", label: "Black Full", color: "#111111" }],

  "3cut": [
    { key: "oval-black", label: "Oval Black", color: "#111111" },
    { key: "sky", label: "Sky", color: "#8fd5ff" },
  ],

  princess3cut: [{ key: "princess", label: "Princess", color: "#ff8fcf" }],

  grid45: [
    { key: "sky", label: "Sky Grid", color: "#8fd5ff" },
    { key: "black-normal", label: "Black", color: "#111111" },
    { key: "white-normal", label: "White", color: "#ffffff" },
  ],

  single45: [
    { key: "paint", label: "Paint", color: "#b8dfff" },
    { key: "star", label: "Star", color: "#fff27a" },
    { key: "forest", label: "Forest", color: "#315c38" },
    { key: "minihp", label: "Mini HP", color: "#bdefff" },
    { key: "queen", label: "Queen", color: "#ff7adf" },
  ],

  webfull: [{ key: "window", label: "Window", color: "#2d61d6" }],
};

const MODE_OPTIONS = [
  { key: "booth", label: "3~4 Cut Photo", source: "webcam" },
  { key: "upload", label: "Upload Image", source: "upload" },
];

const LAYOUT_OPTIONS = [
  { key: "4cut", label: "4 Cut" },
  { key: "4cutFull", label: "4 Cut Full" },
  { key: "3cut", label: "3 Cut" },
  { key: "princess3cut", label: "3 Cut Special" },
  { key: "grid45", label: "4:5 (4 Cut)" },
  { key: "single45", label: "4:5 (1 Cut)" },
  { key: "webfull", label: "Web Full Size" },
];

const THEME_OPTIONS = [
  { key: "basic", label: "Basic Mono" },
  { key: "haduri", label: "Haduri Blur" },
  { key: "digicam", label: "Digicam" },
  { key: "sticker", label: "Y2K Sticker" },
  { key: "magazine", label: "Magazine Cover" },
  { key: "paint", label: "Paint Editor" },
];

const FILTER_OPTIONS = [
  { key: "original", label: "Original" },
  { key: "bw", label: "B&W" },
  { key: "haduri", label: "Haduri" },
  { key: "dream POP", label: "Dream POP" },
  { key: "fisheye", label: "Fisheye" },
];

const STICKER_OPTIONS = [
  { key: "star1", src: "/stickers/star_1.png" },
  { key: "star2", src: "/stickers/star_2.png" },
  { key: "star3", src: "/stickers/star_3.png" },
  { key: "star4", src: "/stickers/star_4.png" },
  { key: "star5", src: "/stickers/star_5.png" },
  { key: "star6", src: "/stickers/star_6.png" },
  { key: "star7", src: "/stickers/star_7.png" },
  { key: "star8", src: "/stickers/star_8.png" },
  { key: "star9", src: "/stickers/star_9.png" },
  { key: "star10", src: "/stickers/star_10.png" },
  { key: "star11", src: "/stickers/star_11.png" },
  { key: "star12", src: "/stickers/star_12.png" },
  { key: "star13", src: "/stickers/star_13.png" },
  { key: "star14", src: "/stickers/star_14.png" },
  { key: "heart1", src: "/stickers/heart_1.png" },
  { key: "heart2", src: "/stickers/heart_2.png" },
  { key: "heart3", src: "/stickers/heart_3.png" },
  { key: "heart4", src: "/stickers/heart_4.png" },
  { key: "heart5", src: "/stickers/heart_5.png" },
  { key: "heart6", src: "/stickers/heart_6.png" },
  { key: "heart7", src: "/stickers/heart_7.png" },
  { key: "heart8", src: "/stickers/heart_8.png" },
  { key: "heart9", src: "/stickers/heart_9.png" },
  { key: "heart10", src: "/stickers/heart_10.png" },
  { key: "heart11", src: "/stickers/heart_11.png" },
  { key: "heart12", src: "/stickers/heart_12.png" },
  { key: "clover1", src: "/stickers/clover_1.png" },
  { key: "clover2", src: "/stickers/clover_2.png" },
  { key: "clover3", src: "/stickers/clover_3.png" },
  { key: "clover4", src: "/stickers/clover_4.png" },
  { key: "clover5", src: "/stickers/clover_5.png" },
];

const STATUS_FLOW = [
  "camera connected",
  "get ready...",
  "smile :)",
  "processing...",
];

function App() {
  const [screen, setScreen] = useState("intro");
  const [introOpen, setIntroOpen] = useState(false);

  const [mode, setMode] = useState({ key: "4cut", source: "webcam" });
  const [layout, setLayout] = useState("4cut");
  const [selectedFrame, setSelectedFrame] = useState("black");
  const theme = "basic";
  const [filter, setFilter] = useState("original");
  const filterRef = useRef("original");

  const [statusText, setStatusText] = useState("camera connected");
  const [countdown, setCountdown] = useState(null);
  const [shots, setShots] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);

  const [controls, setControls] = useState({
    blur: 1,
    grain: 0,
    monoStrength: 1.0, // 블루/그린 톤 강도
    posterizeLevels: 4, // 포스터화 단계
    fisheyeStrength: 0.72, // 어안 왜곡 강도
  });

  const [showDate, setShowDate] = useState(false);
  const [dateStamp, setDateStamp] = useState({
    x: 263,
    y: 388,
    size: 14,
  });

  const [stickers, setStickers] = useState([]);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [resultUrl, setResultUrl] = useState("");
  const [policyModal, setPolicyModal] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const boothCanvasRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const previewWrapRef = useRef(null);
  const liveCanvasRef = useRef(null);
  const recordCanvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoChunksRef = useRef([]);
  const recordRafRef = useRef(null);
  const countdownRef = useRef(null);

  const [recordVideoUrl, setRecordVideoUrl] = useState("");
  const liveRafRef = useRef(null);

  const frameCount = useMemo(() => getFrameCount(layout), [layout]);
  const layoutRatio = useMemo(() => getLayoutRatio(layout), [layout]);
  const previewW = previewWrapRef.current?.clientWidth || 360;
  const previewH = previewWrapRef.current?.clientHeight || 720;

  const previewTimerRef = useRef(null);

  const [showText, setShowText] = useState(false);
  const [textItem, setTextItem] = useState({
    x: 180,
    y: 650,
    size: 28,
  });

  const [photoAdjust, setPhotoAdjust] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    if (screen === "booth" && mode.source === "webcam") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {};
  }, [screen, mode.source]);

  useEffect(() => {
    if (screen !== "edit" || !shots.length) return;

    clearTimeout(previewTimerRef.current);

    previewTimerRef.current = setTimeout(() => {
      renderPreview();
    }, 160);

    return () => clearTimeout(previewTimerRef.current);
  }, [
    screen,
    shots,
    layout,
    selectedFrame,
    theme,
    filter,
    controls,
    stickers,
    photoAdjust,
  ]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  function openMachine() {
    setIntroOpen(true);
    setTimeout(() => {
      setScreen("mode");
      setIntroOpen(false);
    }, 650);
  }

  async function startCamera() {
    try {
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = async () => {
          await videoRef.current.play();

          cancelAnimationFrame(liveRafRef.current);
          renderLivePreview();
        };
      }

      setStatusText("camera connected");
    } catch (error) {
      console.error(error);
      setStatusText("camera access denied");
      alert(
        "Please allow camera access to take photos.\n사진 촬영을 위해 카메라 권한을 허용해 주세요.",
      );
    }
  }

  function stopCamera() {
    cancelAnimationFrame(liveRafRef.current);
    liveRafRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.onloadedmetadata = null;
    }

    if (liveCanvasRef.current) {
      const canvas = liveCanvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function renderLivePreview() {
    const video = videoRef.current;
    const canvas = liveCanvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    const currentFilter = filterRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      liveRafRef.current = requestAnimationFrame(renderLivePreview);
      return;
    }

    if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth;
    if (canvas.height !== video.videoHeight) canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    if (currentFilter === "fisheye") {
      drawLiveFisheyeFast(ctx, video, canvas.width, canvas.height);
    } else {
      ctx.filter = getLiveCanvasFilter(currentFilter);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";

      if (currentFilter === "bw") {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const gray =
            data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }

        ctx.putImageData(imageData, 0, 0);
      }

      if (currentFilter === "dream POP") {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const grad = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        grad.addColorStop(0, "rgba(255, 70, 170, 0.22)");
        grad.addColorStop(0.45, "rgba(255, 230, 60, 0.16)");
        grad.addColorStop(1, "rgba(70, 190, 255, 0.22)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      if (currentFilter === "haduri") {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = "rgba(255,255,230,0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    }

    ctx.restore();

    liveRafRef.current = requestAnimationFrame(renderLivePreview);
  }

  function playCameraSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.log("sound skipped");
    }
  }

  function getCaptureRatio(layoutKey) {
    switch (layoutKey) {
      case "4cut":
        return 799 / 420;

      case "princess3cut":
        return 799 / 571;

      case "3cut":
        return 765 / 437;

      case "4cutFull":
        return 857 / 641;

      case "grid45":
        return 526 / 676;

      case "single45":
        return 4 / 5;

      case "webfull":
        return 1123 / 597;

      default:
        return 16 / 9;
    }
  }

  function captureCurrentFrame() {
    const video = videoRef.current;
    const canvas = boothCanvasRef.current;
    if (!video || !canvas) return null;

    const ctx = canvas.getContext("2d");

    const sourceW = video.videoWidth || 1280;
    const sourceH = video.videoHeight || 720;
    const targetRatio = getCaptureRatio(layout);

    let cropW = sourceW;
    let cropH = sourceW / targetRatio;

    if (cropH > sourceH) {
      cropH = sourceH;
      cropW = sourceH * targetRatio;
    }

    const cropX = (sourceW - cropW) / 2;
    const cropY = (sourceH - cropH) / 2;

    canvas.width = 1280;
    canvas.height = Math.round(1280 / targetRatio);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(
      video,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    ctx.restore();

    return canvas.toDataURL("image/png");
  }

  function startVideoRecording() {
    const liveCanvas = liveCanvasRef.current;
    const recordCanvas = recordCanvasRef.current;

    if (!liveCanvas || !recordCanvas) return;

    if (recordVideoUrl) {
      URL.revokeObjectURL(recordVideoUrl);
      setRecordVideoUrl("");
    }

    videoChunksRef.current = [];

    recordCanvas.width = liveCanvas.width || 1280;
    recordCanvas.height = liveCanvas.height || 720;

    const ctx = recordCanvas.getContext("2d");

    function drawRecordingFrame() {
      ctx.clearRect(0, 0, recordCanvas.width, recordCanvas.height);

      ctx.drawImage(liveCanvas, 0, 0, recordCanvas.width, recordCanvas.height);

      const currentCount = countdownRef.current;

      if (currentCount > 0) {
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = "bold 160px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 18;
        ctx.fillText(
          String(currentCount),
          recordCanvas.width / 2,
          recordCanvas.height / 2,
        );
        ctx.restore();
      }

      recordRafRef.current = requestAnimationFrame(drawRecordingFrame);
    }

    drawRecordingFrame();

    const stream = recordCanvas.captureStream(30);

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const recorder = new MediaRecorder(stream, { mimeType });

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        videoChunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      cancelAnimationFrame(recordRafRef.current);

      const blob = new Blob(videoChunksRef.current, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);
      setRecordVideoUrl(url);
    };

    recorder.start();
  }

  function stopVideoRecording() {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }

  async function startAutoCapture() {
    if (isCapturing) return;
    if (mode.source === "upload") return;

    setIsCapturing(true);
    setShots([]);
    setStatusText("get ready...");
    startVideoRecording();

    const captured = [];

    for (let i = 0; i < frameCount; i++) {
      for (let sec = 3; sec > 0; sec--) {
        setCountdown(sec);
        setStatusText(sec === 1 ? "smile :)" : "get ready...");
        await wait(1000);
      }

      setCountdown(null);
      playCameraSound();

      const shot = captureCurrentFrame();
      if (shot) captured.push(shot);

      setShots([...captured]);
      setStatusText(i === frameCount - 1 ? "processing..." : "next shot...");
      await wait(500);
    }

    setIsCapturing(false);
    setStatusText("processing...");

    stopVideoRecording();

    await wait(500);
    setScreen("edit");
  }

  function handleModeSelect(item) {
    const nextLayout = item.source === "upload" ? "4cut" : "4cut";

    setMode({ key: item.key, source: item.source });
    setLayout(nextLayout);
    setShots([]);
    setUploadedImage(null);
    setStickers([]);
    setResultUrl("");
    setScreen("frame");
  }

  function handleUploadFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setStatusText("image ready");
    };
    reader.readAsDataURL(file);
  }

  function useUploadedImage() {
    if (!uploadedImage) {
      alert("Please choose a photo first!\n먼저 사진을 선택해 주세요!");
      return;
    }
    const arr = Array.from({ length: frameCount }, () => uploadedImage);
    setShots(arr);
    setScreen("edit");
  }

  function addSticker(sticker) {
    const wrap = previewWrapRef.current;
    const width = wrap?.clientWidth || 360;
    const height = wrap?.clientHeight || 720;

    const id = Date.now() + Math.random();

    setStickers((prev) => [
      ...prev,
      {
        id,
        src: sticker.src,
        x: width * 0.5,
        y: height * 0.5,
        size: 34,
      },
    ]);

    setSelectedStickerId(id);
  }

  function removeSticker(id) {
    setStickers((prev) => prev.filter((item) => item.id !== id));
  }

  function handlePointerDown(id) {
    setDragId(id);
  }

  function handlePointerMove(e) {
    if (!previewWrapRef.current) return;

    const rect = previewWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragId === "dateStamp") {
      setDateStamp((prev) => ({
        ...prev,
        x: Math.round(Math.max(0, Math.min(x, rect.width))),
        y: Math.round(Math.max(0, Math.min(y, rect.height))),
      }));
      return;
    }

    if (!dragId) return;

    setStickers((prev) =>
      prev.map((item) =>
        item.id === dragId
          ? { ...item, x: Math.max(0, x), y: Math.max(0, y) }
          : item,
      ),
    );
  }

  function handlePointerUp() {
    setDragId(null);
    renderPreview();
  }

  async function renderPreview() {
    const wrap = previewWrapRef.current;
    const canvas = previewCanvasRef.current;
    if (!wrap || !canvas || !shots.length) return;

    const width = wrap.clientWidth;
    const height = wrap.clientHeight;

    const dataUrl = await composePhotoBooth({
      shots,
      layoutKey: layout,
      frameKey: selectedFrame,
      themeKey: theme,
      filterName: filter,
      controls,
      stickers,
      showDate,
      dateStamp,
      drawDateToCanvas: false,
      previewWidth: width,
      previewHeight: height,
      photoAdjust,
    });

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = dataUrl;
  }

  async function finalizeResult() {
    clearTimeout(previewTimerRef.current);

    const wrap = previewWrapRef.current;
    if (!wrap || !shots.length) return;

    const dataUrl = await composePhotoBooth({
      shots,
      layoutKey: layout,
      frameKey: selectedFrame,
      themeKey: theme,
      filterName: filter,
      controls,
      stickers,
      showDate,
      dateStamp,
      drawDateToCanvas: true,
      previewWidth: wrap.clientWidth,
      previewHeight: wrap.clientHeight,
      photoAdjust,
    });

    setResultUrl(dataUrl);
    setScreen("result");
  }

  function downloadResult() {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `hapqy-photo-booth-${Date.now()}.png`;
    link.click();
  }

  async function downloadVideo() {
    if (!recordVideoUrl) return;

    try {
      const response = await fetch(recordVideoUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `hapqy-photo-booth-video-${Date.now()}.webm`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert(
        "Unable to download the video. Please try again later.\n영상을 다운로드할 수 없어요. 잠시 후 다시 시도해 주세요.",
      );
    }
  }

  async function shareResult() {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Hapqy Photo Booth",
          text: "Make your own Y2K photo booth 💖",
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!\n사이트 주소를 복사했어요!");
    } catch (e) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert(
          "Sharing is not supported, so the link was copied.\n공유 기능이 지원되지 않아 사이트 주소를 복사했어요!",
        );
      } catch {
        alert(
          "Share failed. Please copy the URL manually.\n공유에 실패했어요. 주소창의 URL을 직접 복사해 주세요.",
        );
      }
    }
  }

  function resetShots() {
    setShots([]);
    setStatusText("camera connected");
    setCountdown(null);
    setIsCapturing(false);
  }

  function retakeAll() {
    setShots([]);
    setStickers([]);
    setResultUrl("");
    setCountdown(null);
    setIsCapturing(false);
    setStatusText("camera connected");
    setScreen("booth");
  }

  function reuploadImage() {
    setShots([]);
    setUploadedImage(null);
    setStickers([]);
    setResultUrl("");
    setRecordVideoUrl("");
    setScreen("upload");
  }

  function resetToMode() {
    setShots([]);
    setStickers([]);
    setUploadedImage(null);
    setResultUrl("");
    setScreen("mode");
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        <canvas ref={boothCanvasRef} style={{ display: "none" }} />
        <canvas ref={recordCanvasRef} style={{ display: "none" }} />
        {screen === "intro" && (
          <section className={`intro-screen ${introOpen ? "open" : ""}`}>
            <div className="intro-overlay" />

            <img
              src="/images/logo.png"
              alt="Hapqy Photo Booth"
              className="intro-logo"
            />

            <div className="intro-start-wrap">
              <button
                type="button"
                className="intro-start-btn"
                onClick={openMachine}
              >
                START
              </button>
            </div>

            <div className="intro-box-wrap">
              <img
                src="/images/photobooth-box.png"
                alt="Photo booth box"
                className={`intro-booth-image ${introOpen ? "pop-out" : ""}`}
              />
            </div>
          </section>
        )}

        {screen === "mode" && (
          <div className="sky-stage">
            <div className="retro-window mode-window">
              <div className="retro-titlebar">
                <img
                  src="/images/logo.png"
                  alt="Hapqy Photo Booth"
                  className="retro-title-logo"
                />
                <div className="retro-window-icons">
                  <span>▁</span>
                  <span>▢</span>
                  <span>×</span>
                </div>
              </div>
              <div className="retro-window-body">
                <p className="window-help">Choose your nostalgic booth mode</p>
                <div className="mode-grid">
                  {MODE_OPTIONS.map((item) => (
                    <button
                      key={item.key}
                      className="xp-button large"
                      onClick={() => handleModeSelect(item)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "frame" && (
          <div className="sky-stage">
            <div className="retro-window frame-window">
              <div className="retro-titlebar">
                <img
                  src="/images/logo.png"
                  alt="Hapqy Photo Booth"
                  className="retro-title-logo"
                />

                <div className="retro-window-icons">
                  <span>▁</span>
                  <span>▢</span>
                  <span>×</span>
                </div>
              </div>

              <div className="retro-window-body frame-retro-body">
                <p className="window-help">Choose your frame layout</p>

                <div className="mode-grid frame-mode-grid">
                  {LAYOUT_OPTIONS.map((item) => (
                    <button
                      key={item.key}
                      className={`retro-button ${layout === item.key ? "active" : ""}`}
                      onClick={() => {
                        setLayout(item.key);
                        setSelectedFrame(FRAME_OPTIONS[item.key][0].key);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                  <p className="window-help">Choose frame design</p>

                  <div className="frame-chip-grid">
                    {FRAME_OPTIONS[layout].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className={`frame-chip ${selectedFrame === item.key ? "active" : ""}`}
                        onClick={() => setSelectedFrame(item.key)}
                        title={item.label}
                      >
                        <span
                          className="frame-color-dot"
                          style={{ background: item.color || "#ffffff" }}
                        />
                        <span className="frame-chip-label">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="retro-actions">
                  <button
                    className="retro-button"
                    onClick={() => setScreen("mode")}
                  >
                    Back
                  </button>
                  <button
                    className="retro-button primary"
                    onClick={() => {
                      if (mode.source === "upload") {
                        setScreen("upload");
                      } else {
                        setScreen("booth");
                      }
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "upload" && (
          <section className="booth-screen">
            <div className="retro-window booth-retro-window">
              <div className="retro-titlebar">
                <img
                  src="/images/logo.png"
                  alt="Hapqy Photo Booth"
                  className="retro-title-logo"
                />

                <div className="retro-window-icons">
                  <span>▁</span>
                  <span>▢</span>
                  <span>×</span>
                </div>
              </div>

              <div className="retro-window-body upload-retro-body">
                <p className="window-help">Upload your image</p>

                <label className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFile}
                  />
                  <span>
                    {uploadedImage ? "Image selected!" : "Choose Image"}
                  </span>
                </label>

                {uploadedImage && (
                  <div className="uploaded-preview">
                    <img src={uploadedImage} alt="uploaded preview" />
                  </div>
                )}

                <div className="retro-actions">
                  <button
                    className="retro-button"
                    onClick={() => setScreen("frame")}
                  >
                    Back
                  </button>

                  <button
                    className="retro-button primary"
                    onClick={useUploadedImage}
                  >
                    Use This Image
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {screen === "booth" && (
          <section className="booth-screen">
            <div className="retro-window booth-retro-window">
              <div className="retro-titlebar">
                <img
                  src="/images/logo.png"
                  alt="Hapqy Photo Booth"
                  className="retro-title-logo"
                />

                <div className="retro-window-icons">
                  <span>▁</span>
                  <span>▢</span>
                  <span>×</span>
                </div>
              </div>

              <div className="retro-window-body booth-retro-body">
                <div className="camera-area">
                  <div className="video-panel">
                    <div className="video-wrap">
                      <video
                        ref={videoRef}
                        className="live-video"
                        playsInline
                        muted
                        autoPlay
                      />
                      <canvas
                        ref={liveCanvasRef}
                        className={`live-canvas ${filter === "fisheye" ? "live-fisheye" : ""}`}
                      />

                      {filter === "haduri" && (
                        <img
                          src="/frames/hadurist_logo.png"
                          alt="hadurist logo"
                          className="live-hadurist-logo"
                        />
                      )}
                      {countdown > 0 && (
                        <div className="countdown">{countdown}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="camera-controls">
                  <div className="status-bar">
                    <span className="status-dot" />
                    {statusText}
                  </div>

                  <div className="booth-filter-tabs">
                    {FILTER_OPTIONS.map((item) => (
                      <button
                        key={item.key}
                        className={`booth-filter-btn ${filter === item.key ? "active" : ""}`}
                        onClick={() => setFilter(item.key)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="snap-actions">
                    <button
                      className="retro-button"
                      onClick={() => setScreen("frame")}
                    >
                      Back
                    </button>
                    <button
                      className="retro-button primary"
                      onClick={startAutoCapture}
                    >
                      SNAP
                    </button>
                    <button className="retro-button" onClick={resetShots}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {screen === "edit" && (
          <div
            className="edit-screen"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="xp-window edit-window">
              <div className="xp-titlebar">
                <span>EDIT / DECORATE</span>
                <div className="xp-controls">
                  <span>—</span>
                  <span>□</span>
                  <span>×</span>
                </div>
              </div>

              <div className="xp-content edit-content">
                <div className="edit-left">
                  <div
                    ref={previewWrapRef}
                    className="preview-stage"
                    style={{ aspectRatio: layoutRatio }}
                  >
                    <canvas ref={previewCanvasRef} className="preview-canvas" />
                    {stickers.map((item) => (
                      <div
                        key={item.id}
                        className={`sticker-item ${selectedStickerId === item.id ? "selected" : ""}`}
                        style={{
                          left: item.x,
                          top: item.y,
                          width: item.size,
                          height: item.size,
                        }}
                        onPointerDown={() => {
                          setSelectedStickerId(item.id);
                          handlePointerDown(item.id);
                        }}
                        onDoubleClick={() => removeSticker(item.id)}
                      >
                        <img src={item.src} alt="" />
                      </div>
                    ))}

                    {showDate && (
                      <div
                        className="date-stamp-item"
                        style={{
                          left: dateStamp.x,
                          top: dateStamp.y,
                          fontSize: dateStamp.size,
                        }}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          setDragId("dateStamp");
                        }}
                      >
                        {dateStamp.value}
                        {new Date()
                          .toLocaleDateString("ko-KR", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\./g, " ")
                          .trim()}
                      </div>
                    )}
                  </div>

                  <div className="hint-row">
                    Double click sticker to remove • Drag sticker to move
                  </div>
                </div>

                <div className="edit-right">
                  <div className="control-block">
                    <h4>Filters</h4>
                    <div className="chip-grid">
                      {FILTER_OPTIONS.map((item) => (
                        <button
                          key={item.key}
                          className={`xp-chip ${filter === item.key ? "active" : ""}`}
                          onClick={() => setFilter(item.key)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="control-block">
                    <h4>Adjust</h4>

                    <label className="range-row">
                      <span>X</span>
                      <input
                        type="range"
                        min="-200"
                        max="200"
                        value={photoAdjust.x}
                        onChange={(e) =>
                          setPhotoAdjust((prev) => ({
                            ...prev,
                            x: Number(e.target.value),
                          }))
                        }
                      />
                      <input
                        className="range-number"
                        type="number"
                        value={photoAdjust.x}
                        onChange={(e) =>
                          setPhotoAdjust((prev) => ({
                            ...prev,
                            x: Number(e.target.value),
                          }))
                        }
                      />
                    </label>

                    <label className="range-row">
                      <span>Y</span>
                      <input
                        type="range"
                        min="-200"
                        max="200"
                        value={photoAdjust.y}
                        onChange={(e) =>
                          setPhotoAdjust((prev) => ({
                            ...prev,
                            y: Number(e.target.value),
                          }))
                        }
                      />
                      <input
                        className="range-number"
                        type="number"
                        value={photoAdjust.y}
                        onChange={(e) =>
                          setPhotoAdjust((prev) => ({
                            ...prev,
                            y: Number(e.target.value),
                          }))
                        }
                      />
                    </label>

                    <label className="range-row">
                      <span>Zoom</span>
                      <input
                        type="range"
                        min="0.55"
                        max="2"
                        step="0.01"
                        value={photoAdjust.scale}
                        onChange={(e) =>
                          setPhotoAdjust((prev) => ({
                            ...prev,
                            scale: Number(e.target.value),
                          }))
                        }
                      />
                      <input
                        className="range-number"
                        type="number"
                        step="0.01"
                        min="0.55"
                        max="2"
                        value={photoAdjust.scale}
                        onChange={(e) =>
                          setPhotoAdjust((prev) => ({
                            ...prev,
                            scale: Number(e.target.value),
                          }))
                        }
                      />
                    </label>

                    <label className="range-row">
                      <span>Grain</span>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        value={controls.grain}
                        onChange={(e) =>
                          setControls((prev) => ({
                            ...prev,
                            grain: Number(e.target.value),
                          }))
                        }
                      />
                      <input
                        className="range-number"
                        type="number"
                        min="0"
                        max="60"
                        value={controls.grain}
                        onChange={(e) =>
                          setControls((prev) => ({
                            ...prev,
                            grain: Number(e.target.value),
                          }))
                        }
                      />
                    </label>
                  </div>

                  <div className="control-block">
                    <h4>Date Stamp</h4>

                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={showDate}
                        onChange={(e) => setShowDate(e.target.checked)}
                      />
                      <span>Show film date stamp</span>
                    </label>

                    {showDate && (
                      <>
                        <label className="range-row">
                          <span>X</span>
                          <input
                            type="range"
                            min="0"
                            max={previewW}
                            value={Math.round(dateStamp.x)}
                            onChange={(e) =>
                              setDateStamp((prev) => ({
                                ...prev,

                                x: Number(e.target.value),
                              }))
                            }
                          />
                          <input
                            className="range-number"
                            type="number"
                            value={dateStamp.x}
                            onChange={(e) =>
                              setDateStamp((prev) => ({
                                ...prev,
                                x: Number(e.target.value),
                              }))
                            }
                          />
                        </label>

                        <label className="range-row">
                          <span>Y</span>
                          <input
                            type="range"
                            min="0"
                            max={previewH}
                            value={Math.round(dateStamp.y)}
                            onChange={(e) =>
                              setDateStamp((prev) => ({
                                ...prev,
                                y: Number(e.target.value),
                              }))
                            }
                          />
                          <input
                            className="range-number"
                            type="number"
                            value={dateStamp.y}
                            onChange={(e) =>
                              setDateStamp((prev) => ({
                                ...prev,
                                y: Number(e.target.value),
                              }))
                            }
                          />
                        </label>

                        <label className="range-row">
                          <span>Size</span>
                          <input
                            type="range"
                            min="14"
                            max="42"
                            value={dateStamp.size}
                            onChange={(e) =>
                              setDateStamp((prev) => ({
                                ...prev,
                                size: Number(e.target.value),
                              }))
                            }
                          />
                          <input
                            className="range-number"
                            type="number"
                            min="14"
                            max="42"
                            value={dateStamp.size}
                            onChange={(e) =>
                              setDateStamp((prev) => ({
                                ...prev,
                                size: Number(e.target.value),
                              }))
                            }
                          />
                        </label>

                        <button
                          type="button"
                          className="xp-button delete-sticker-btn"
                          onClick={() => setShowDate(false)}
                        >
                          Delete Date
                        </button>
                      </>
                    )}
                  </div>

                  <div className="control-block">
                    <h4>Stickers</h4>
                    <div className="sticker-palette">
                      {STICKER_OPTIONS.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          className="sticker-btn"
                          onClick={() => addSticker(item)}
                        >
                          <img src={item.src} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedStickerId && (
                    <label className="range-row">
                      <span>Size</span>
                      <input
                        type="range"
                        min="18"
                        max="120"
                        value={
                          stickers.find((item) => item.id === selectedStickerId)
                            ?.size || 34
                        }
                        onChange={(e) => {
                          const size = Number(e.target.value);
                          setStickers((prev) =>
                            prev.map((item) =>
                              item.id === selectedStickerId
                                ? { ...item, size }
                                : item,
                            ),
                          );
                        }}
                      />
                      <strong>
                        {stickers.find((item) => item.id === selectedStickerId)
                          ?.size || 34}
                      </strong>

                      <button
                        className="xp-button delete-sticker-btn"
                        onClick={() => removeSticker(selectedStickerId)}
                      >
                        Delete Sticker
                      </button>
                    </label>
                  )}

                  <div className="frame-actions">
                    <button
                      className="xp-button"
                      onClick={() => {
                        if (mode.source === "upload") {
                          setShots([]);
                          setUploadedImage(null);
                          setResultUrl("");
                          setScreen("upload");
                        } else {
                          setScreen("booth");
                        }
                      }}
                    >
                      {mode.source === "upload" ? "Reupload" : "Retake"}
                    </button>
                    <button
                      className="xp-button primary"
                      onClick={finalizeResult}
                    >
                      Finish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="result-screen">
            <div className="xp-window result-window">
              <div className="xp-titlebar">
                <span>RESULT</span>
                <div className="xp-controls">
                  <span>—</span>
                  <span>□</span>
                  <span>×</span>
                </div>
              </div>

              <div className="xp-content result-content">
                <div className="result-preview">
                  {resultUrl && <img src={resultUrl} alt="final result" />}
                </div>

                <div className="ad-slot">
                  <span>AD SLOT PLACEHOLDER</span>
                </div>

                <div className="result-buttons">
                  <button
                    className="xp-button primary"
                    onClick={downloadResult}
                  >
                    Download Photo
                  </button>

                  {recordVideoUrl && (
                    <button className="xp-button" onClick={downloadVideo}>
                      Download WebM
                    </button>
                  )}

                  <button className="xp-button" onClick={shareResult}>
                    Copy Link
                  </button>

                  <button
                    className="xp-button"
                    onClick={
                      mode.source === "upload" ? reuploadImage : retakeAll
                    }
                  >
                    {mode.source === "upload" ? "Reupload" : "Retake"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter setPolicyModal={setPolicyModal} />

      {policyModal && (
        <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />
      )}
    </div>
  );
}

function getLiveCanvasFilter(filter) {
  switch (filter) {
    case "B&W":
    case "bw":
    case "blackwhite":
    case "blackWhite":
      return "grayscale(1) contrast(1.18) brightness(1.04)";

    case "haduri":
      return "brightness(1.2) contrast(1.08) saturate(0.82) blur(0.18px)";

    case "dream POP":
      return "brightness(1.18) contrast(1.28) saturate(2.1) hue-rotate(-8deg)";

    case "fisheye":
      return "contrast(1.08) saturate(1.08) brightness(1.03)";

    default:
      return "none";
  }
}

function drawLiveFisheyeFast(ctx, video, width, height) {
  const size = Math.min(width, height) * 0.95;
  const x = (width - size) / 2;
  const y = (height - size) / 2;

  ctx.save();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();

  ctx.filter = "contrast(1.08) saturate(1.08) brightness(1.03)";

  const zoom = 1.42;
  const drawW = width * zoom;
  const drawH = height * zoom;
  const drawX = (width - drawW) / 2;
  const drawY = (height - drawH) / 2;

  ctx.drawImage(video, drawX, drawY, drawW, drawH);

  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.9)";
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function SiteFooter({ setPolicyModal }) {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <button type="button" onClick={() => setPolicyModal("privacy")}>
          Privacy Policy
        </button>
        <span>|</span>
        <button type="button" onClick={() => setPolicyModal("terms")}>
          Terms of Use
        </button>
      </div>

      <p>© kimdokrae 2026. Hapqy Photo Booth</p>
    </footer>
  );
}

function PolicyModal({ type, onClose }) {
  const isPrivacy = type === "privacy";

  return (
    <div className="policy-modal-backdrop" onClick={onClose}>
      <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="policy-modal-header">
          <h2>{isPrivacy ? "개인정보처리방침" : "이용약관"}</h2>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="policy-modal-body">
          {isPrivacy ? (
            <>
              <p>
                Hapqy Photo Booth는 사용자의 사진 및 영상 데이터를 서버에
                저장하지 않습니다.
              </p>

              <h3>1. 수집하는 정보</h3>
              <p>
                본 서비스는 회원가입, 로그인, 이름, 이메일, 연락처 등의
                개인정보를 직접 수집하지 않습니다. 사용자가 촬영하거나 업로드한
                사진 및 영상은 브라우저 내에서만 처리됩니다.
              </p>

              <h3>2. 사진 및 영상 처리</h3>
              <p>
                사용자가 생성한 사진과 WebM 영상은 사용자의 기기에서 일시적으로
                생성되며, 새로고침 또는 브라우저 종료 시 사라질 수 있습니다.
                별도 서버 저장은 하지 않습니다.
              </p>

              <h3>3. 쿠키 및 분석 도구</h3>
              <p>
                현재 본 서비스는 필수 쿠키를 사용하지 않습니다. 향후 광고, 통계,
                분석 도구를 추가하는 경우 본 방침에 관련 내용을 반영할 수
                있습니다.
              </p>

              <h3>4. 광고</h3>
              <p>
                서비스 내 광고 영역이 포함될 수 있으며, 광고 플랫폼이 자체
                정책에 따라 쿠키 또는 광고 식별자를 사용할 수 있습니다.
              </p>

              <h3>5. 이용자의 권리</h3>
              <p>
                본 서비스는 별도 회원 정보를 저장하지 않으므로 개인정보 열람,
                정정, 삭제 요청 대상 정보가 존재하지 않을 수 있습니다.
              </p>

              <h3>6. 문의</h3>
              <p>
                개인정보 관련 문의는 사이트 운영자가 공개한 연락 수단을 통해
                접수할 수 있습니다.
              </p>

              <p className="policy-date">시행일: 2026년</p>
            </>
          ) : (
            <>
              <p>
                Hapqy Photo Booth는 사용자가 웹에서 사진과 짧은 영상을 만들 수
                있는 포토부스 서비스입니다.
              </p>

              <h3>1. 서비스 이용</h3>
              <p>
                사용자는 본 서비스를 개인적이고 비상업적인 용도로 자유롭게
                이용할 수 있습니다. 단, 타인의 권리, 초상권, 저작권을 침해하는
                방식으로 사용할 수 없습니다.
              </p>

              <h3>2. 사용자 콘텐츠</h3>
              <p>
                사용자가 촬영, 업로드, 다운로드한 이미지와 영상에 대한 책임은
                사용자에게 있습니다. 운영자는 사용자가 생성한 콘텐츠를 서버에
                저장하지 않습니다.
              </p>

              <h3>3. 금지 행위</h3>
              <p>
                불법 콘텐츠 제작, 타인 사칭, 명예훼손, 저작권 침해, 서비스 방해
                행위는 금지됩니다.
              </p>

              <h3>4. 서비스 변경</h3>
              <p>
                운영자는 기능 개선, 보안, 운영상 필요에 따라 서비스 일부를
                변경하거나 중단할 수 있습니다.
              </p>

              <h3>5. 면책</h3>
              <p>
                브라우저, 기기, 네트워크 환경에 따라 사진 또는 영상 저장 기능이
                정상 작동하지 않을 수 있습니다. 사용자는 중요한 결과물을 즉시
                다운로드해 보관해야 합니다.
              </p>

              <h3>6. 저작권</h3>
              <p>
                사이트 디자인, 로고, UI, 코드, 서비스 구성은 운영자에게 권리가
                있으며 무단 복제 및 재배포를 금지합니다.
              </p>

              <p className="policy-date">시행일: 2026년</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
