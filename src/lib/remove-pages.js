import { PDFDocument } from 'pdf-lib';
import { getRemoveSerialization, invertSelection } from './array';

async function removePages(doc, selection) {
  if(doc && typeof doc === 'object') {
    if(doc.hasOwnProperty('catalog')) {
      const output = await PDFDocument.create();
      const _output = doc;
      const count = doc.getPageCount();
      const { length } = selection;

      if(count > length && length > 0) {
        getRemoveSerialization(selection).forEach(i => _output.removePage(i));

        const _cache = await output.copyPages(
          _output,
          invertSelection(selection, count)
        );
        _cache.forEach(p => output.addPage(p));
      }

      return await output.save();
    } else {
      console.error('Invalid input document');
    }
  }
}

export default removePages;
