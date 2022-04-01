import "./App.css";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { data } from "./data";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

let headerfooterDoc = {
  // header: {
  //   margin: [0, 0, 0, 0],
  //   alignment: "center",
  //   image: "",
  //   height: 100,
  //   width: 600,
  // },
  content: [],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
      margin: [0, 30, 0, 20],
    },
    subheader: {
      fontSize: 14,
      margin: [0, 15, 0, 10],
      color: "#003893",
    },
    details: {
      fontSize: 9,
      bold: true,
      margin: [0, 0, 0, 0],
      color: "#000",
    },
    text: {
      alignment: "justify",
    },
    link: {
      decoration: "underline",
      color: "#0074c1",
    },
  },

  //
  // static footer
  footer: {
    margin: [0, 30, 0, 0],
    fontSize: 11,
    columns: [
      {
        text: "WE REFLECT YOU,",
        margin: [208, 0, 0, 0],
      },
      {
        color: "green",
        text: "WHEN WE SERVE YOU",
      },
    ],
  },

  //   content: content,
  pageMargins: [50, 120, 50, 50],
};

let table = {
  // headers are automatically repeated if the table spans over multiple pages
  // you can declare how many rows should be treated as headers
  // headerRows: 1,
  widths: [30, 150, 300],

  body: [
    [
      { text: "S.No", fillColor: "#82cc41", bold: true },
      { text: "Second", fillColor: "#82cc41", bold: true },
      { text: "Third", fillColor: "#82cc41", bold: true },
    ],
    ["1", "Current Designation (With reporting relations)", data.designation],
    [
      "2",
      "Qualification (with specialization & academic performance)",
      data.qualification,
    ],
    [
      {
        text: "Professional Exposure",
        colSpan: 3,
        fillColor: "#82cc41",
        bold: true,
      },
      {},
      {},
    ],
    ["3", "Current location of the work/Native", data.currentLocation],
    [
      "4",
      { text: "Salary / Notice period" },
      {
        table: {
          margin: [0, 0, 0, 0],
          headerRows: 1,

          width: [100, 200, 100],
          // border: [false, false, false, false],
          body: [
            [
              { text: "Current CTC", padding: 10 },
              { text: "Expected CTC" },
              { text: "Notice Period" },
            ],
            [
              data.salary.currentCTC,
              data.salary.expectedCTC,
              data.salary.noticePeriod,
            ],
          ],
        },
      },
    ],
    [
      "5",
      "Total Years of experience / Relevant Years of experience",
      data.yearsOfExperience,
    ],
    [
      "6",
      "Career Highlights",
      {
        table: {
          margin: [0, 0, 0, 0],
          headerRows: 1,

          width: [100, 200, 100],
          // border: [false, false, false, false],
          body: [
            [
              { text: "Employer", padding: 10 },
              { text: "Designation" },
              { text: "Employment Period" },
            ],
            [
              data.careerHighlights[0].employer,
              data.careerHighlights[0].designation,
              data.careerHighlights[0].employmentPeriod,
            ],
            [
              data.careerHighlights[1].employer,
              data.careerHighlights[1].designation,
              data.careerHighlights[1].employmentPeriod,
            ],
            [
              data.careerHighlights[2].employer,
              data.careerHighlights[2].designation,
              data.careerHighlights[2].employmentPeriod,
            ],
          ],
        },
      },
    ],
    [
      {
        text: "Personal Details",
        colSpan: 3,
        fillColor: "#82cc41",
        bold: true,
      },
      {},
      {},
    ],
    ["7", "DOB", data.personalDetails.dob],
    ["8", "Gender", data.personalDetails.gender],
    ["9", "Family (Dependents)", data.personalDetails.family],
    [
      {
        text: "Consultant Assessment",
        colSpan: 3,
        fillColor: "#82cc41",
        bold: true,
      },
      {},
      {},
    ],
    [
      {
        text: data.consultantAssessment,
        colSpan: 3,
      },
      {},
      {},
    ],
  ],
};

console.time("creatingPDF");
/// all those stuffs
headerfooterDoc["content"].push(
  {
    text: "PROFILE SNAPSHOT",
    style: "details",
  },
  {
    text: `Name of the candidate: ${data.name} `,
    style: "details",
  },
  {
    text: `Profile for the position of: ${data.profileForPosition}`,
    margin: [0, 0, 0, 10],
    style: "details",
  },
  {
    table: table,
  }
);

// getting generated resume as arrayBuffer
let buffer1;
let buffer2;
const pdfDocGenerator = pdfMake.createPdf(headerfooterDoc);
console.log("start");
pdfDocGenerator.getBuffer((buffer) => {
  buffer1 = buffer.buffer;
  console.log(buffer1, "buf1");
});

// dropzone
function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      console.log(acceptedFiles);
      fname = acceptedFiles[0].name;
      console.log(fname);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents

        buffer2 = reader.result;
        console.log(buffer2);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });
  let fname;
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section
          style={{
            height: "100px",
            width: "200px",

            marginLeft: "45% ",
          }}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p style={{ backgroundColor: "lightblue" }}>
              Drag 'n' drop some files here, or click to select files
            </p>
            <span>
              <b>{fname}</b>
            </span>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

// merging and download functions
function download(file, filename, type) {
  const link = document.getElementById("link");
  link.download = filename;
  let binaryData = [];
  binaryData.push(file);
  link.href = URL.createObjectURL(new Blob(binaryData, { type: type }));
}
async function merge() {
  const pdf1 = await PDFDocument.load(buffer1);
  const pdf2 = await PDFDocument.load(buffer2);
  const mergedPdf = await PDFDocument.create();
  const copiedPagesA = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
  const copiedPagesB = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
  copiedPagesB.forEach((page) => mergedPdf.addPage(page));
  const mergedPdfFile = await mergedPdf.save();
  console.log(mergedPdfFile, "pdf ");
  download(
    mergedPdfFile,
    "pdf-lib_page_copying_example.pdf",
    "application/pdf"
  );
}

function App() {
  return (
    <div className="App">
      test
      {MyDropzone()}
      <button onClick={merge}>Merge</button> <br />
      <a id="link">Download</a>
    </div>
  );
}

export default App;
