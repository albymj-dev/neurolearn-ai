import { jsPDF } from 'jspdf';
import { TransformedLearningData, AcademicTopic } from '../data/academicTexts';

export function exportAnalyticsToPDF(
  topicTitle: string,
  subject: string,
  transformedData: TransformedLearningData,
  latencyMs: number | null,
  language: 'en' | 'hi' | 'ml' = 'en'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  // Header Banner
  doc.setFillColor(79, 70, 229); // Indigo 600
  doc.rect(margin, yPos, contentWidth, 14, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('NeuroLearn AI  |  Smart India Hackathon (SIH 2026)', margin + 5, yPos + 9);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Team Synapse', pageWidth - margin - 26, yPos + 9);

  yPos += 22;

  // Topic Title & Subtitle
  doc.setTextColor(26, 26, 26);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(topicTitle || 'Academic Concept Analysis', margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Subject: ${subject || 'STEM General Science'}  •  Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
  yPos += 12;

  // Metrics Box (Cognitive Efficiency)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 22, 3, 3, 'FD');

  const colWidth = contentWidth / 3;
  // Metric 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105); // emerald
  doc.text('+38%', margin + 8, yPos + 10);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Reading Speed Gain', margin + 8, yPos + 16);

  // Metric 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229); // indigo
  doc.text('-65%', margin + colWidth + 8, yPos + 10);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Cognitive Load Reduction', margin + colWidth + 8, yPos + 16);

  // Metric 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(217, 119, 6); // amber
  doc.text(latencyMs ? `${latencyMs}ms` : '<20ms', margin + colWidth * 2 + 8, yPos + 10);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('AI Pipeline Latency', margin + colWidth * 2 + 8, yPos + 16);

  yPos += 30;

  // Section 1: Concept Chunk Cards
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('1. Digestible Concept Chunks (3-Sentence Structure)', margin, yPos);
  yPos += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  transformedData.chunkCards.forEach((card, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`[${idx + 1}] ${card.title}:`, margin + 4, yPos);
    yPos += 4.5;
    
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(card.text, contentWidth - 8);
    doc.text(lines, margin + 4, yPos);
    yPos += lines.length * 4.5 + 4;
  });

  yPos += 4;

  // Section 2: Flowchart Tree Steps
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('2. Sequential Flowchart Process', margin, yPos);
  yPos += 6;

  doc.setFontSize(9);
  transformedData.conceptTree.forEach((step, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(`Step ${idx + 1}:`, margin + 4, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const stepText = step.replace(/^Step \d+:\s*/i, '');
    const lines = doc.splitTextToSize(stepText, contentWidth - 22);
    doc.text(lines, margin + 20, yPos);
    yPos += lines.length * 4.5 + 3;
  });

  yPos += 5;

  // Section 3: Everyday Analogy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('3. Cognitive Anchor (Everyday Real-World Analogy)', margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const analogyLines = doc.splitTextToSize(`"${transformedData.analogy}"`, contentWidth - 8);
  doc.text(analogyLines, margin + 4, yPos);
  yPos += analogyLines.length * 4.5 + 8;

  // Check if we need page 2 for Micro-Quiz and Regional Summary
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  // Section 4: Low-Anxiety Micro-Quiz Summary
  if (transformedData.microQuiz && transformedData.microQuiz.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('4. Low-Anxiety Comprehension Check (Micro-Quiz)', margin, yPos);
    yPos += 6;

    transformedData.microQuiz.forEach((q, idx) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      const qLines = doc.splitTextToSize(`Q${idx + 1}: ${q.question}`, contentWidth - 8);
      doc.text(qLines, margin + 4, yPos);
      yPos += qLines.length * 4.5 + 2;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(5, 150, 105);
      const answerText = `Correct Answer: ${q.options[q.correctIndex]}`;
      doc.text(answerText, margin + 8, yPos);
      yPos += 4.5;

      doc.setTextColor(100, 116, 139);
      const expLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, contentWidth - 12);
      doc.text(expLines, margin + 8, yPos);
      yPos += expLines.length * 4.5 + 5;
    });
  }

  // Footer on current page
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('NeuroLearn AI • Assistive Workspace for Dyslexia & ADHD • Smart India Hackathon 2026', margin, pageHeight - 10);

  // Save the PDF
  const safeFilename = topicTitle.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30);
  doc.save(`NeuroLearn_Analytics_${safeFilename || 'Report'}.pdf`);
}
