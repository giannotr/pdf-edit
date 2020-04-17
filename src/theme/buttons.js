import React from 'react';
import styled from 'styled-components';
import { theme } from './theme';

const ButtonBoilerplate = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: ${props => props.height || '50px'};
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  border-radius: 0;
  color: #fff;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  filter: hue-rotate(0);
  transition: filter .25s ease;

  &:hover {
    filter: hue-rotate(-35deg);
  }

  svg {
    margin: 0 5px;
  }
`;

const ButtonPrimary = styled(ButtonBoilerplate)`
  background: ${theme.colors.buttons.primary};
`;

const ButtonSecondary = styled(ButtonBoilerplate)`
  background: ${theme.colors.buttons.secondary};
`;

const ButtonTertiary = styled(ButtonBoilerplate)`
  background: ${theme.colors.buttons.tertiary};
`;

export function Button({
  theme,
  height,
  disabled,
  onClick,
  children,
}) {
  const _props = { height, disabled, onClick };

  switch(theme) {
    case 'primary':
      return <ButtonPrimary {..._props}>{children}</ButtonPrimary>;
    case 'secondary':
      return <ButtonSecondary {..._props}>{children}</ButtonSecondary>;
    case 'tertiary':
      return <ButtonTertiary {..._props}>{children}</ButtonTertiary>
    default:
      return <ButtonPrimary {..._props}>{children}</ButtonPrimary>;
  };
}
