import {
  parseRange,
  unparseSelection,
  getFileName,
  splitFileList,
} from './parsers';

// Test the main parser `parseRange`

test('Test the range parser with non-falsy values', () => {
  expect(parseRange('1', 1)).toEqual([0]);
  expect(parseRange('1, 2', 2)).toEqual([0, 1]);
  expect(parseRange('1-2', 2)).toEqual([0, 1]);
  expect(parseRange('1, 2, 5', 5)).toEqual([0, 1, 4]);
  expect(parseRange('1, 2-4, 5', 5)).toEqual([0, 1, 2, 3, 4]);
  expect(parseRange(', 2-4, 5', 5)).toEqual([1, 2, 3, 4]);
  expect(parseRange('1-3, , 5', 5)).toEqual([0, 1, 2, 4]);
  expect(parseRange('1-', 5)).toEqual([0, 1, 2, 3, 4]);
  expect(parseRange('-5', 5)).toEqual([0, 1, 2, 3, 4]);
  expect(parseRange('9-10', 10)).toEqual([8, 9]);
  expect(parseRange('1-3', 2)).toEqual([0, 1]);
});

test('Test the range parser with falsy values', () => {
  expect(parseRange(undefined, 0)).toEqual([]);
  expect(parseRange(null, 0)).toEqual([]);
  expect(parseRange(false, 0)).toEqual([]);
  expect(parseRange('', 0)).toEqual([]);
});

// The according "unparser" `unparseSelection`
// is the inverse function to `parseRange`

const selectionArrays = [
  [],
  [0],
  [0, 1],
  [1, 2, 3],
  [0, 2, 3],
  [0, 1, 2, 4],
  [0, 1, 2, 4, 6, 7],
]

test('Test the selection unparser with non-falsy values', () => {
  for(const a of selectionArrays) {
    expect(parseRange(unparseSelection(a), 8)).toEqual(a);
  }
});

test('Test the selection unparser with falsy values', () => {
  expect(unparseSelection(undefined)).toBe('');
  expect(unparseSelection(null)).toBe('');
  expect(unparseSelection(false)).toBe('');
});

// Test file name parser

test('Test the file name parser with non-falsy values', () => {
  expect(getFileName('A:/')).toBe('');
  expect(getFileName('B:/filename')).toBe('filename');
  expect(getFileName('C:/filename.ext')).toBe('filename.ext');
  expect(getFileName('D:/folder/filename.ext')).toBe('filename.ext');
  expect(getFileName('E:/folder/subfolder/filename.ext')).toBe('filename.ext');
});

test('Test the file name parser with falsy values', () => {
  expect(getFileName(undefined)).toBe('');
  expect(getFileName(null)).toBe('');
  expect(getFileName(false)).toBe('');
  expect(getFileName('')).toBe('');
});

// Test file list splitter

test('Test the file name parser with non-falsy values', () => {
  expect(splitFileList('"A:/filename.ext"'))
    .toEqual(['A:/filename.ext']);
  expect(splitFileList('"A:/filename1.ext", "B:/filename2.ext"'))
    .toEqual(['A:/filename1.ext', 'B:/filename2.ext']);
  expect(splitFileList('"A:/directory, with comma/filename.ext"'))
    .toEqual(['A:/directory, with comma/filename.ext']);
});

test('Test the file name parser with falsy values', () => {
  expect(splitFileList(undefined)).toEqual([]);
  expect(splitFileList(null)).toEqual([]);
  expect(splitFileList(false)).toEqual([]);
  expect(splitFileList('')).toEqual([]);
});

