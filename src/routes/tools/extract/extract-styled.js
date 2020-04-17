import styled from 'styled-components';

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: auto 200px;
  grid-template-rows: 100px 50px;
  max-width: 700px;
  margin: 25px auto;
`;

export const CellFile = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

export const CellRange = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

export const CellSave = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`;
