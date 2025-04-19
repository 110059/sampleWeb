import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../common/Sidebar";

const ImageRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedItems, setRecognizedItems] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { predictions, imagePath } = response.data;

      setRecognizedItems((prev) => [
        ...prev,
        {
          id: Date.now(), // temporary ID
          imagePath,
          predictions,
        },
      ]);

      setSelectedImage(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image recognition failed.");
    }
  };

  const handleDelete = async (imagePath) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/upload/delete`, {
        data: { path: imagePath },
      });

      setRecognizedItems((prev) => prev.filter((item) => item.imagePath !== imagePath));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image.");
    }
  };

  return (
    <div className="d-flex" style={{ height: "85vh" }}>
    <Sidebar />
    <div className="col-md-9 d-flex flex-column p-4 overflow-auto">

      <h2>Image Recognition</h2>

      <div className="mb-3">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button className="btn btn-primary ms-2" onClick={handleUpload}>Recognize</button>
      </div>

      {recognizedItems.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered mt-4">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Predictions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recognizedItems.map((item) => (
                <tr key={item.imagePath}>
                  <td><img src={`${process.env.REACT_APP_API_URL}/${item.imagePath}`} alt="upload" height="80" /></td>
                  <td>
                    <ul className="mb-0">
                      {item.predictions.map((pred, idx) => (
                        <li key={idx}>{pred.className} - {(pred.probability * 100).toFixed(2)}%</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.imagePath)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default ImageRecognition;

