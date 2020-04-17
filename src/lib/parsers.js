// TODO: Add doc strings

const rxNumber = new RegExp('^[0-9]+$');
const rxRange = new RegExp('([0-9]*)(?:-)([0-9]*)');

function _parseRange(string) {
  // Enfore input types.
  const _string = string + '';
  
  // Test input format.
  const match = rxRange.exec(_string);

  if(match) {
    // Grab the full match, min and max.
    const [full, min, max] = rxRange.exec(_string);
    // Only "work" if `min` is leq `max`.
    // Return the empty set otherwise.
    if(full && Number(min) <= Number(max)) {
      // Initialize the returned array and fill it with 0, ... , max-min.
      const range = [...Array(max - min + 1).keys()];
      // Shift up my `min` and return.
      return range.map(x => x + (min - 1));
    } else {
      return [];
    }
  } else {
    throw new Error(`Input string format is invalid for the range parser`);
  }
}

export function parseRange(string, maxIndex) {
  // Enfore input types.
  const _string = string + '';
  const _maxIndex = maxIndex + '';
  
  // Setup returned array.
  let range = [];
  
  // Treat range string as comma separated list.
  for (let chunk of _string.split(',').map(s => s.trim())) {
    // Single numbers get inserted directly.
    // Proper range chunks will be processed by _parseRange.
    // Everything else as well as out of bounds values will be ignored.
    if(chunk && rxNumber.test(chunk)) {
      if(chunk <= maxIndex) range.push(chunk - 1);
    } else if(rxRange.exec(chunk)) {
      const [_chunk, min, max] = rxRange.exec(chunk);
      // Prepare the omissited forms ('-n', 'n-')
      // to be implicitely completed by the global bounds:
      // min = 1, max = maxIndex
      if(chunk[0] === '-') chunk = `1${_chunk}`;
      if(chunk[chunk.length - 1] === '-') chunk = `${_chunk}${_maxIndex}`;
      if(max > maxIndex) chunk = `${min}-${_maxIndex}`;
      range = [...range, ..._parseRange(chunk)];
    }
  }

  // Return the combined ranges
  // while eliminating double entries
  // and sorting in ascendent order.
  return [...new Set(range)].sort((x, y) => x - y);
}

export function unparseSelection(array) {
  // If falsy, directly return an empty string.
  if(!array) {
    return '';
  } else if(Array.isArray(array)) {
    // Sort the input and enforce only numbers as entries.
    const sorted = array.map(x => Number(x)).sort((x, y) => x - y);
    
    // Initialize the collector.
    const collectSubTokens = [];
    
    // Initialize outer couting index and the interval bounds.
    let i = 0, a, b;
    // Start the outer loop
    while(i < sorted.length) {
      // Initialize the inner counting index to the current `i`
      // and set the interval bounds to this point.
      let j = i;
      a = sorted[j];
      b = a;
      
      // As long as the entries are successors
      // shift the right bound one further to the right.
      while(j < sorted.length - 1 && sorted[j] === sorted[j + 1] - 1) {
        b = sorted[j + 1];
        j++;
      }
      
      // If the right bound was not moved
      // the "range" is a point and `a` (= `b`) gets pushed as a single entry.
      // Otherwise it is a proper range
      // and the string 'a-b' is pushed to the token collector.
      if(a === b) {
        collectSubTokens.push(a + 1 + '');
      } else {
        collectSubTokens.push(`${a + 1}-${b + 1}`);
      }
      
      i = j + 1;
    }
    
    return collectSubTokens.join(', ');
  } else {
    throw new Error('The unparser cannot deal with anything else than arrays');
  }
}

export function getFileName(path) {
  if(path) {
    const _path = (path + '').replace(/\\/g, '/');
    const _rx = new RegExp('^.*[/]', 'i');
    return _path.replace(_rx, '');
  } else {
    return '';
  }
}

export function splitFileList(input) {
  if(input) {
    const _input = input + '';
    const _rx = new RegExp('"([^<>="?*]*)"[,]*', 'gi');
    return _input.match(_rx).map(m => m.replace(_rx, '$1'));
  } else {
    return [];
  }
}
