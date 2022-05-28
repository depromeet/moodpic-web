import React, { ChangeEventHandler } from 'react';
import { ToggleWrapper, Trigger, Icon, IconWrapper, ToggleText } from './Toggle.styles';

export interface ToggleProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Toggle = ({ checked, onChange }: ToggleProps): React.ReactElement => {
  return (
    <ToggleWrapper>
      <Trigger type="checkbox" checked={checked} onChange={onChange} />
      <IconWrapper>
        <Icon />
        <ToggleText checked={checked}>{checked ? 'on' : 'off'}</ToggleText>
      </IconWrapper>
    </ToggleWrapper>
  );
};

export default Toggle;
