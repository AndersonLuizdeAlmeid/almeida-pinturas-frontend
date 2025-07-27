import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { BudgetView } from "@/types/Budget";
import { toast } from "sonner";

export const generatePDF = (budget: BudgetView) => {
  const {
    clientName,
    clientCnpj,
    clientAddress,
    clientPhone,
    description,
    documentDate,
    items,
  } = budget;
  if (!clientName || !description || items.length === 0) {
    toast.error("Preencha todas as informações antes de gerar o orçamento.");
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Cabeçalho
  const title = "ORÇAMENTO - Almeida Pinturas";
  doc.setFillColor("gray");
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setFontSize(24);
  doc.setTextColor("#FFFFFF");
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 26);

  // Dados do Cliente
  const clientInfo = [
    `Razão Social: ${clientName}`,
    `CNPJ: ${clientCnpj}`,
    `Endereço: ${clientAddress}`,
    `Telefone: ${clientPhone}`,
  ];
  doc.setFontSize(12);
  doc.setTextColor("#000000");
  clientInfo.forEach((line: string, idx: number) => {
    const w = doc.getTextWidth(line);
    doc.text(line, (pageWidth - w) / 2, 50 + idx * 8);
  });

  // Descrição do Projeto
  doc.setFontSize(14);
  doc.setTextColor("#003366");
  const projTitle = "Descrição do Projeto:";
  const projTitleWidth = doc.getTextWidth(projTitle);
  doc.text(projTitle, (pageWidth - projTitleWidth) / 2, 85);
  doc.setFontSize(12);
  doc.setTextColor("#000000");
  const descLines = doc.splitTextToSize(description, pageWidth - 40);
  descLines.forEach((line: string, idx: number) => {
    const w = doc.getTextWidth(line);
    doc.text(line, (pageWidth - w) / 2, 95 + idx * 6);
  });

  // Tabela de Itens
  const tableData = items.map((item, i) => [
    i + 1,
    item.name,
    "1",
    item.price.toFixed(2),
    item.price.toFixed(2),
  ]);

  autoTable(doc, {
    head: [["#", "Item", "Quantidade", "Unitário", "Total"]],
    body: tableData,
    startY: 120 + descLines.length * 6,
    theme: "grid",
    headStyles: { fillColor: "gray", textColor: "#FFFFFF" },
    bodyStyles: { fillColor: "#f4f4f4", textColor: "#000000" },
    styles: { halign: "center", fontSize: 11, cellPadding: 3 },
    columnStyles: { 1: { cellWidth: pageWidth * 0.4 } },
  });

  // Total
  const finalY = (doc as any).lastAutoTable.finalY;
  const total = items.reduce((sum, it) => sum + it.price, 0).toFixed(2);
  const totalText = `Total: R$ ${total}`;
  doc.setFontSize(14);
  doc.setTextColor("#003366");
  const tw = doc.getTextWidth(totalText);
  doc.text(totalText, (pageWidth - tw) / 2, finalY + 20);

  // Data
  doc.setFontSize(10);
  doc.setTextColor("#666666");
  const dateStr = `Data: ${new Date(documentDate).toLocaleDateString()}`;
  const dw = doc.getTextWidth(dateStr);
  doc.text(dateStr, (pageWidth - dw) / 2, doc.internal.pageSize.height - 20);

  // Rodapé
  doc.setTextColor("#888888");
  const footer = "Rua Evaristo Canal, 186, Carlos Barbosa, RS, Brasil";
  const fw = doc.getTextWidth(footer);
  doc.text(footer, (pageWidth - fw) / 2, doc.internal.pageSize.height - 10);

  // Salvar PDF
  const pdfBlob = doc.output("blob");

  // Crie um File (nome, tipo e data opcionalmente):
  const fileName = `Orcamento_${clientName.replace(/\s+/g, "_")}.pdf`;
  const pdfFile = new File([pdfBlob], fileName, {
    type: "application/pdf",
    lastModified: new Date().getTime(),
  });

  return pdfFile;
};
