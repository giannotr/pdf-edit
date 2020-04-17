import { getRemoveSerialization, invertSelection } from './array';

// Test `getRemoveSerialization`

test('Test the removal array generator with non-falsy values', () => {
  expect(getRemoveSerialization([])).toEqual([]);
  expect(getRemoveSerialization([0])).toEqual([0]);
  expect(getRemoveSerialization([1])).toEqual([1]);
  expect(getRemoveSerialization([0, 1, 2])).toEqual([0, 0, 0]);
  expect(getRemoveSerialization([1, 2, 3])).toEqual([1, 1, 1]);
  expect(getRemoveSerialization([2, 3, 5])).toEqual([2, 2, 3]);
});

test('Test the removal array generator parser with falsy values', () => {
  expect(getRemoveSerialization(undefined)).toEqual([]);
  expect(getRemoveSerialization(null)).toEqual([]);
  expect(getRemoveSerialization(false)).toEqual([]);
  expect(getRemoveSerialization('')).toEqual([]);
});

// Test `invertSelection`

test('Test the selection inverter with non-falsy values', () => {
  expect(invertSelection([], 0)).toEqual([]);
  expect(invertSelection([0], 1)).toEqual([]);
  expect(invertSelection([0], 2)).toEqual([1]);
  expect(invertSelection([0, 1, 2], 4)).toEqual([3]);
  expect(invertSelection([1, 3, 5], 6)).toEqual([0, 2, 4]);
});

