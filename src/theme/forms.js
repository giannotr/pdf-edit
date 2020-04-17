import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from './theme';

const _void = () => {}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
`;

const InputField = styled.input`
  width: 100%;
  min-width: 100px;
  height: 50px;
  padding: 0 10px;
  border: none;
  outline: none;
  background: ${theme.colors.input.background};
  font-size: 12px;
  color: ${theme.colors.input.text};
  text-overflow: ellipsis;
  cursor: ${props => props.disabled ? 'not-allowed' : 'auto'};

  &::placeholder {
    color: ${theme.colors.input.placeholder};
  }

  &:hover::placeholder,
  &:focus::placeholder {
    color: ${theme.colors.input.text};
  }

  &:focus ~ label {
    filter: brightness(100%) hue-rotate(135deg);
  }
`;

const Label = styled.label`
  position: absolute;
  top: 2.5px;
  right: 4.5px;
  font-size: 9px;
  font-weight: bold;
  color: ${theme.colors.input.label};
  filter: brightness(0) hue-rotate(0);
  transition: filter .3s ease;
`;

export function Input(props) {
  const { name, label } = props;

  return(
    <InputWrapper>
      <InputField {...props} />
      <Label htmlFor={name}>{label}</Label>
    </InputWrapper>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  onClick: _void,
  onKeyPress: _void,
  disabled: false,
};
