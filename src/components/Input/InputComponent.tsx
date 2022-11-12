import React, { Fragment } from 'react';
import { theme } from '../../theme/variables';
import { Input } from './InputComponent.styles';
import { IInputProps } from './InputComponent.types';

export const InputComponent: React.FC<IInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  onSubmit
}) => (
  <Fragment>
    <Input
      variant='standard'
      placeholder={placeholder}
      label={label}
      value={value}
      multiline
      onKeyUp={(event) => {
        if (onSubmit !== undefined && event.key === 'Enter') {
          onSubmit();
        }
      }}
      inputProps={{
        style: {
          color: `${theme.text.primary}`
        }
      }}
      InputLabelProps={{
        style: {
          color: `${theme.text.label}`
        }
      }}
      onChange={(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => onChange(event.target.value)}
    />
  </Fragment>
);
