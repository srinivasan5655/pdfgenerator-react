import { PDFDocument, rgb } from "pdf-lib";
import { headerImage } from "./header";

export default async function modifyPdf(file) {
  // Fetch an existing PDF document

  const existingPdfBytes = file;

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();

  const pngImageBytes = headerImage;

  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDims = pngImage.scale(0.25);
  pages.forEach((page) => {
    page.setHeight(page.getHeight() + 80);
    page.drawText("WE REFLECT YOU,", {
      x: 170,
      y: 15,
      size: 11,
    });

    page.drawText("WHEN WE SERVE YOU", {
      x: 273,
      y: 15,
      size: 11,
      color: rgb(0.13, 0.54, 0.13),
    });

    // Add a blank page to the document

    page.drawImage(pngImage, {
      x: page.getWidth() - pngDims.width / 1.01,
      y: page.getHeight() - pngDims.height / 1.2,
      width: pngDims.width,
      height: pngDims.height,
    });
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await (await pdfDoc.save()).buffer;

  return pdfBytes;
}
