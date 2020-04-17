import styled from 'styled-components';

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: auto 150px;
  grid-template-rows: 100px;
  max-width: 600px;
  margin: 25px auto;
`;

export const CellFile = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

export const CellSave = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;
