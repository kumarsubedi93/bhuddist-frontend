"use client";

import { PDFDocument, degrees } from "pdf-lib";
import React, { useState } from "react";

const RotatePDF = () => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleRotatePDF = async () => {
    if (!file) return;

    setLoading(true);
    setDownloadUrl(""); // Reset download URL for new uploads

    try {
      // Read the PDF file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Rotate each page by 90 degrees
      pdfDoc.getPages().forEach((page) => {
        page.setRotation(degrees(-90)); // Rotate by 90 degrees
      });

      // Serialize the PDFDocument to bytes
      const rotatedPdfBytes = await pdfDoc.save();

      // Create a blob from the rotated PDF bytes
      const blob = new Blob([rotatedPdfBytes], { type: "application/pdf" });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-md  bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Rotate PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2 mb-4 cursor-pointer hover:border-blue-500 transition duration-200"
      />
      <button
        onClick={handleRotatePDF}
        disabled={loading}
        className={`w-full py-2 text-white font-semibold rounded-md 
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 transition duration-200"
                    }`}
      >
        {loading ? "Rotating..." : "Rotate PDF"}
      </button>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={file?.name? `${file?.name.split('.')[0] + "rotated.pdf"}`:'rotated.pdf'}
          className="mt-4 block text-center text-blue-600 hover:underline"
        >
          Download Rotated PDF
        </a>
      )}
    </div>
  );
};

export default RotatePDF;
