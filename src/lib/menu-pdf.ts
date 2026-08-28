import { formatDA, menuCategories, menuItems } from "./menu";

const MARGIN = 44;
const PAGE_W = 595.28; // A4 portrait
const PAGE_H = 841.89;
const BURNT: [number, number, number] = [176, 84, 46];
const INK: [number, number, number] = [38, 32, 28];
const MUTED: [number, number, number] = [122, 112, 104];

/** Construit le document PDF du menu complet (A4, plusieurs pages). */
export async function buildMenuPdf() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const contentW = PAGE_W - MARGIN * 2;
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed <= PAGE_H - MARGIN - 24) return;
    doc.addPage();
    y = MARGIN;
  };

  // En-tête
  doc.setFillColor(...BURNT);
  doc.rect(0, 0, PAGE_W, 118, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("times", "normal");
  doc.setFontSize(26);
  doc.text("L'Atelier en Ville", MARGIN, 54);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text("Restaurant · Café · Cocktails — Tizi Ouzou", MARGIN, 74);
  doc.text("Route vers Azib Ahmed et Hasnaoua, Tizi Ouzou 15000 · 020 94 34 53", MARGIN, 92);
  y = 150;

  doc.setTextColor(...MUTED);
  doc.setFontSize(9.5);
  doc.text("Toutes nos viandes sont halal. Prix en dinars algériens, service compris.", MARGIN, y);
  y += 26;

  for (const cat of menuCategories) {
    const items = menuItems.filter((item) => item.category === cat.id);
    if (items.length === 0) continue;

    ensureSpace(70);
    doc.setFont("times", "normal");
    doc.setFontSize(15);
    doc.setTextColor(...BURNT);
    doc.text(cat.label.toUpperCase(), MARGIN, y);
    y += 12;
    doc.setDrawColor(...BURNT);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text(cat.description, MARGIN, y + 6);
    y += 22;

    for (const item of items) {
      const priceText = formatDA(item.price);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      const priceW = doc.getTextWidth(priceText);
      const nameLines = doc.splitTextToSize(item.name, contentW - priceW - 16) as string[];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.8);
      const descLines = doc.splitTextToSize(item.description, contentW - 8) as string[];

      const blockH = nameLines.length * 13 + descLines.length * 11 + 10;
      ensureSpace(blockH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...INK);
      nameLines.forEach((line, i) => doc.text(line, MARGIN, y + i * 13));
      doc.text(priceText, PAGE_W - MARGIN, y, { align: "right" });
      y += nameLines.length * 13;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.8);
      doc.setTextColor(...MUTED);
      descLines.forEach((line, i) => doc.text(line, MARGIN, y + 1 + i * 11));
      y += descLines.length * 11 + 10;
    }

    y += 8;
  }

  // Pieds de page
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p += 1) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text("L'Atelier en Ville — Tizi Ouzou", MARGIN, PAGE_H - 26);
    doc.text(`Page ${p} / ${pages}`, PAGE_W - MARGIN, PAGE_H - 26, { align: "right" });
  }

  return doc;
}

/** Génère et télécharge le menu complet en PDF. */
export async function downloadMenuPdf(fileName = "menu-atelier-en-ville.pdf") {
  const doc = await buildMenuPdf();
  doc.save(fileName);
}
