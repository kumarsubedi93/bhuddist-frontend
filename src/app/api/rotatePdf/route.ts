import { PDFDocument, degrees } from "pdf-lib";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file: any = formData.get("file");

  if (!file) {
    return new Response("File not found", { status: 400 });
  }

  // Read the PDF file as an ArrayBuffer
  const pdfBytes = await file.arrayBuffer();

  try {
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);

    pdfDoc.getPages().forEach((page) => {
      page.setRotation(degrees(-90));
    });

    // Serialize the PDFDocument to bytes
    const rotatedPdfBytes = await pdfDoc.save();

    // Return the rotated PDF as a response
    return new Response(rotatedPdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="rotated.pdf"',
      },
    });
  } catch (error) {
    console.error("Error rotating PDF:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
