import { PDFDocument } from 'pdf-lib';

async function filterPages(doc, selection) {
  if(doc && typeof doc === 'object') {
    if(doc.hasOwnProperty('catalog')) {
      const count = doc.getPageCount();
      const { length } = selection;

      if(length === count) {
        return await doc.save();
      } else {
        const output = await PDFDocument.create();
        const extraction = await output.copyPages(doc, selection);
        extraction.forEach(p => output.addPage(p));
        return await output.save();
      }
    } else {
      console.error('Invalid input document');
    }
  }
}

export default filterPages;
