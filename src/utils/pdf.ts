import html2Pdf from "html-pdf-node";
import fs from "fs";
import path from "path";

export const generatePdf = async (template: string, fileName: string) => {
  const options = {
    format: "A4",
    orientation: "portrait",
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
  };
  const file = { content: template };
  const pdfPath = path.resolve(__dirname, "../../static/pdf/" + fileName);
  return html2Pdf.generatePdf(file, options, (err, pdfBuffer) => {
    if (err) {
      throw err;
    }
    fs.writeFileSync(pdfPath, pdfBuffer);
    return fs.readFileSync(pdfPath);
    // console.log("PDF Buffer:-", pdfBuffer);
  });
};
