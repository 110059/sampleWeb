import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import draw from "./utilities"; // Ensure this function is correctly implemented

function FaceDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Force TensorFlow.js to use WebGL or CPU
        await tf.setBackend("webgl"); // Try WebGL first
        await tf.ready(); // Ensure TensorFlow.js is ready

        // Load the face detection model
        const model = await blazeface.load();
        console.log("FaceDetection Model Loaded");

        const detectFace = async () => {
          if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Set video and canvas dimensions
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Detect faces
            const predictions = await model.estimateFaces(video, false);

            console.log(predictions); // Debugging output

            // Draw the results
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            draw(predictions, ctx);
          }
        };

        // Run face detection every 100ms
        const interval = setInterval(detectFace, 100);

        // Cleanup on unmount
        return () => {
          clearInterval(interval);
          tf.disposeVariables(); // Dispose TensorFlow variables
        };
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: 100,
            left: 0,
            right: 80,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: 100,
            left: 0,
            right: 80,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default FaceDetection;
