import { PDFDocument } from 'pdf-lib';

const { readFileSync } = window.require('fs');

async function mergeFiles(list) {
  const _output = await PDFDocument.create();

  for(const path of list) {
    const data = readFileSync(path, 'base64');
    const doc = await PDFDocument.load(data);
    const indices = [...new Array(doc.getPageCount()).keys()];
    const _pages = await _output.copyPages(doc, indices);
    _pages.forEach(p => _output.addPage(p));
  }

  return await _output.save();
}

export default mergeFiles;
