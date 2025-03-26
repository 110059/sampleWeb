import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import draw from "../../utilities/utilities"; // Ensure this function is correctly implemented
import Sidebar from "../common/Sidebar"; // Import Sidebar

function FaceDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let modelRef = useRef(null);
  let intervalRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.setBackend("webgl"); // Use WebGL for better performance
        await tf.ready(); // Ensure TensorFlow.js is ready

        modelRef.current = await blazeface.load();
        console.log("FaceDetection Model Loaded");

        startFaceDetection();
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    const startFaceDetection = () => {
      intervalRef.current = setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video.readyState === 4 &&
          modelRef.current
        ) {
          const video = webcamRef.current.video;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          const predictions = await modelRef.current.estimateFaces(video, false);
          console.log(predictions); // Debugging output

          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            draw(predictions, ctx);
          }
        }
      }, 100);
    };

    loadModel();

    return () => {
      clearInterval(intervalRef.current); // Stop face detection
      if (modelRef.current) {
        modelRef.current.dispose(); // Dispose TensorFlow model
        modelRef.current = null;
      }
      tf.disposeVariables(); // Cleanup TensorFlow variables
    };
  }, []);

  return (
    <div className="d-flex" style={{ height: "85vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="col-md-9 d-flex flex-column align-items-center justify-content-center">
        <h2>Face Detection</h2>
        <div style={{ position: "relative", width: 640, height: 480 }}>
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FaceDetection;
