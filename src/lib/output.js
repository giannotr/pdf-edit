const { writeFileSync } = window.require('fs');

export function outputPDF(path, pdfBytes) {
  try {
    writeFileSync(path, pdfBytes, 'binary');
    return true;
  } catch {
    return false;
  }
}
