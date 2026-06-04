import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";

const app = express();
const upload = multer({ dest: "uploads/" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
const convertedDir = path.join(__dirname, "converted");

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(convertedDir, { recursive: true });

app.use(cors());

app.post("/api/convert-mp4", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video file uploaded" });
  }

  const inputPath = req.file.path;
  const outputFileName = `hapqy-${Date.now()}.mp4`;
  const outputPath = path.join(convertedDir, outputFileName);

  execFile(
    "ffmpeg",
    [
      "-y",
      "-i",
      inputPath,

      // 1.5배속
      "-filter:v",
      "setpts=PTS/1.5",

      // 영상만 저장
      "-an",

      // MP4 호환성
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",

      outputPath,
    ],
    (error) => {
      fs.unlink(inputPath, () => {});

      if (error) {
        console.error(error);
        return res.status(500).json({ error: "FFmpeg conversion failed" });
      }

      res.download(outputPath, outputFileName, () => {
        fs.unlink(outputPath, () => {});
      });
    },
  );
});

app.listen(4000, () => {
  console.log("MP4 converter running on http://localhost:4000");
});