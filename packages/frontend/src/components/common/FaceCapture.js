import React, { useRef, useEffect, useState } from "react";
import * as faceapi from 'face-api.js';

const FaceCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setIsModelLoaded(true);
    };
    loadModels();
  }, []);

  // Start webcam once models are loaded
  useEffect(() => {
    if (!isModelLoaded) return;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = videoRef.current;

        if (video) {
          video.srcObject = stream;

          video.onloadedmetadata = () => {
            video.play().catch(err => console.error("Video play error:", err));
          };
        }
      } catch (err) {
        console.error("Webcam error:", err);
      }
    };

    startVideo();
  }, [isModelLoaded]);

  // Detect face on interval
  useEffect(() => {
    if (!isModelLoaded) return;

    const interval = setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
      setIsFaceDetected(!!detection);
    }, 500);

    return () => clearInterval(interval);
  }, [isModelLoaded]);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    onCapture(imageData);
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "45%", maxWidth: "200px" }} autoPlay muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {isFaceDetected ? (
        <button onClick={handleCapture}>Capture Face</button>
      ) : (
        <p>Detecting face...</p>
      )}
    </div>
  );
};

export default FaceCapture;
