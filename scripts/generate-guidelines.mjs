/*
 * Generates the downloadable registration guideline PDFs served from
 * /public/guidelines. These are plain-text, dependency-free PDFs built with
 * a minimal but fully valid PDF structure (correct xref offsets), so the
 * "Download Guidelines" buttons on every registration portal work offline
 * with no external libraries.
 *
 * Run with: node scripts/generate-guidelines.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "guidelines");

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const LEFT = 56;
const RIGHT = PAGE_W - 56;
const MAX_CHARS = 86;

const GOLD = [1, 0.6667, 0];
const DARK = [0.13, 0.16, 0.24];
const GRAY = [0.42, 0.46, 0.53];
const RULE = [0.85, 0.87, 0.9];

const MINISTRY = "Anambra State Ministry of Commerce, Industry and Trade";

function esc(str) {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    // eslint-disable-next-line no-control-regex
    .replace(/[^\x20-\x7E]/g, "-");
}

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function textOp(x, y, str, size, bold, color) {
  const font = bold ? "/F2" : "/F1";
  return `BT ${font} ${size} Tf ${color[0]} ${color[1]} ${color[2]} rg ${x.toFixed(
    2
  )} ${y.toFixed(2)} Td (${esc(str)}) Tj ET`;
}

function rectOp(x, y, w, h, color) {
  return `q ${color[0]} ${color[1]} ${color[2]} rg ${x.toFixed(2)} ${y.toFixed(
    2
  )} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`;
}

function lineOp(x1, y1, x2, y2, color, width) {
  return `q ${color[0]} ${color[1]} ${color[2]} RG ${width} w ${x1.toFixed(
    2
  )} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(
    2
  )} l S Q`;
}

function renderPages(doc) {
  const pages = [];
  let ops = [];
  let y = 0;

  function draw(str, size, bold, color, x = LEFT) {
    ops.push(textOp(x, y, str, size, bold, color));
  }
  function move(delta) {
    y -= delta;
  }
  function newPage() {
    ops.push(textOp(LEFT, 42, MINISTRY, 8, false, GRAY));
    pages.push(ops.join("\n"));
    ops = [];
    ops.push(rectOp(LEFT, PAGE_H - 56, RIGHT - LEFT, 3, GOLD));
    y = PAGE_H - 88;
  }
  function ensure(space) {
    if (y - space < 64) newPage();
  }
  function wrapped(str, size, color, lineHeight, x = LEFT, bold = false) {
    for (const line of wrap(str, MAX_CHARS)) {
      ensure(lineHeight);
      draw(line, size, bold, color, x);
      move(lineHeight);
    }
  }

  // Header (first page)
  ops.push(rectOp(LEFT, PAGE_H - 62, RIGHT - LEFT, 4, GOLD));
  y = PAGE_H - 96;
  draw("ANAMBRA STATE", 11, true, GOLD);
  move(20);
  draw("MINISTRY OF COMMERCE, INDUSTRY AND TRADE", 9.5, false, GRAY);
  move(36);
  wrapped(doc.title, 22, DARK, 30, LEFT, true);
  move(4);
  if (doc.subtitle) {
    draw(doc.subtitle, 12, false, GOLD);
    move(26);
  }
  ops.push(lineOp(LEFT, y + 10, RIGHT, y + 10, RULE, 1));
  move(30);

  // Introduction
  for (const paragraph of doc.intro) {
    wrapped(paragraph, 10.5, DARK, 16);
    move(8);
  }
  move(6);

  // Sections
  for (const section of doc.sections) {
    ensure(42);
    draw(section.heading, 13, true, DARK);
    move(23);

    section.items.forEach((item) => {
      const lines = wrap(item, MAX_CHARS - 4);
      ensure(lines.length * 15 + 12);
      lines.forEach((line, index) => {
        if (index === 0) {
          draw("-", 10.5, true, GOLD, LEFT);
        }
        draw(line, 10.5, false, DARK, LEFT + 14);
        if (index < lines.length - 1) move(15);
      });
      move(16);
    });
    move(14);
  }

  // Contact
  ensure(90);
  draw("Contact", 13, true, DARK);
  move(23);
  for (const line of doc.contact) {
    ensure(16);
    draw(line, 10.5, false, GRAY);
    move(15);
  }

  ops.push(textOp(LEFT, 42, MINISTRY, 8, false, GRAY));
  pages.push(ops.join("\n"));
  return pages;
}

function buildPdf(doc) {
  const contents = renderPages(doc);
  const n = contents.length;

  const objCatalog = 1;
  const objPages = 2;
  const objContentStart = 3;
  const objPageStart = objContentStart + n;
  const objFont1 = objPageStart + n;
  const objFont2 = objFont1 + 1;
  const total = objFont2;

  const parts = [];
  parts[objCatalog] = `<< /Type /Catalog /Pages ${objPages} 0 R >>`;

  const kids = [];
  for (let i = 0; i < n; i += 1) kids.push(`${objPageStart + i} 0 R`);
  parts[objPages] = `<< /Type /Pages /Kids [${kids.join(
    " "
  )}] /Count ${n} >>`;

  for (let i = 0; i < n; i += 1) {
    const stream = contents[i];
    parts[objContentStart + i] =
      `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n` +
      stream +
      "\nendstream";
  }

  for (let i = 0; i < n; i += 1) {
    parts[objPageStart + i] =
      `<< /Type /Page /Parent ${objPages} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 ${objFont1} 0 R /F2 ${objFont2} 0 R >> >> ` +
      `/Contents ${objContentStart + i} 0 R >>`;
  }

  parts[objFont1] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  parts[objFont2] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  for (let i = 1; i <= total; i += 1) {
    offsets[i] = Buffer.byteLength(pdf, "latin1");
    pdf += `${i} 0 obj\n${parts[i]}\nendobj\n`;
  }

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${total + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= total; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${total + 1} /Root ${objCatalog} 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

const CONTACT = [
  `Email: commerce@anambrastate.gov.ng`,
  `Phone: +234 (0) 813 423 4567`,
  `Website: commerce.anambrastate.gov.ng`,
];

const documents = [
  {
    file: "business-registration-guidelines.pdf",
    title: "Business Registration Guidelines",
    subtitle: "Anambra State Ministry of Commerce, Industry and Trade",
    intro: [
      "This guide outlines the requirements and recommended steps for registering your business with the Anambra State Ministry of Commerce, Industry and Trade.",
      "Please read it carefully before starting your application so that the process is smooth, fast and error-free.",
    ],
    sections: [
      {
        heading: "Registration Guidelines",
        items: [
          "Ensure all information provided is accurate and up to date.",
          "All fields marked with * are required.",
          "You will be able to upload documents in the next step.",
          "Review your information carefully before final submission.",
        ],
      },
      {
        heading: "Required Documents",
        items: [
          "CAC Certificate (if registered)",
          "Means of Identification",
          "Proof of Address",
          "Tax Identification Number (TIN)",
          "Business Plan (Optional)",
          "Passport Photograph",
        ],
      },
    ],
  },
  {
    file: "sme-registration-guidelines.pdf",
    title: "SME Registration Guidelines",
    subtitle: "Anambra State Ministry of Commerce, Industry and Trade",
    intro: [
      "This guide outlines the requirements and recommended steps for registering your Small and Medium Enterprise (SME) with the Anambra State Ministry of Commerce, Industry and Trade.",
      "Completing your registration gives you access to government support programmes, financing opportunities and capacity-building initiatives.",
    ],
    sections: [
      {
        heading: "Registration Guidelines",
        items: [
          "Provide accurate and valid information.",
          "All fields marked with * are required.",
          "You can save and continue later.",
          "Upload clear and valid documents.",
          "Review all information before final submission.",
        ],
      },
      {
        heading: "Required Documents",
        items: [
          "CAC Certificate (if registered)",
          "Means of Identification",
          "Proof of Address",
          "Business Profile",
          "Passport Photograph",
        ],
      },
    ],
  },
  {
    file: "cooperative-registration-guidelines.pdf",
    title: "Cooperative Registration Guidelines",
    subtitle: "Anambra State Ministry of Commerce, Industry and Trade",
    intro: [
      "This guide outlines the requirements and recommended steps for registering your cooperative society with the Anambra State Ministry of Commerce, Industry and Trade.",
      "Registration grants your cooperative legal recognition, access to government support programmes and technical development services.",
    ],
    sections: [
      {
        heading: "Registration Guidelines",
        items: [
          "Ensure all information provided is accurate and up to date.",
          "All fields marked with * are required.",
          "You will be able to upload documents in the next step.",
          "Review your information carefully before final submission.",
        ],
      },
      {
        heading: "Required Documents",
        items: [
          "Constitution & Bye-Laws",
          "Minutes of Inaugural Meeting",
          "List of Executive Members",
          "Chairman's Means of Identification",
          "Secretary's Means of Identification",
          "Proof of Office Address",
          "Executive Passport Photographs",
          "Financial Records / Share Register (Optional)",
        ],
      },
    ],
  },
  {
    file: "msme-registration-guidelines.pdf",
    title: "MSME Registration Guidelines",
    subtitle: "Anambra State Ministry of Commerce, Industry and Trade",
    intro: [
      "This guide outlines the requirements and recommended steps for registering your Micro, Small and Medium Enterprise (MSME) with the Anambra State Ministry of Commerce, Industry and Trade.",
      "Registered MSMEs gain access to government support programmes, financing opportunities and business development services tailored for growth.",
    ],
    sections: [
      {
        heading: "Registration Guidelines",
        items: [
          "Provide accurate and valid information.",
          "All fields marked with * are required.",
          "You can save and continue later.",
          "Upload clear and valid documents.",
          "Review all information before final submission.",
        ],
      },
      {
        heading: "Required Documents",
        items: [
          "CAC Certificate (if registered)",
          "Means of Identification",
          "Proof of Address",
          "Business Profile",
          "Passport Photograph",
        ],
      },
    ],
  },
];

mkdirSync(outDir, { recursive: true });

for (const doc of documents) {
  const buffer = buildPdf({ ...doc, contact: CONTACT });
  const target = join(outDir, doc.file);
  writeFileSync(target, buffer);
  console.log(
    `Generated ${doc.file} (${(buffer.length / 1024).toFixed(1)} KB)`
  );
}

console.log(`\nGuideline PDFs written to ${outDir}`);
