import React, { ReactElement, useState } from 'react';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';
import { Textarea, TextareaContainer } from './TextArea.styles';

export interface TextAreaProps<TFieldValues extends FieldValues = FieldValues>
  extends React.TextareaHTMLAttributes<Omit<HTMLTextAreaElement, 'name'>> {
  value?: string;
  height?: string;
  borderRadius?: string;
  registerOptions?: RegisterOptions<TFieldValues>;
  name?: Path<TFieldValues>;
}
/**
 * react-hook-form의 FormContext가 주입된 TextArea
 */
const RHFTextArea = <TFieldValues extends FieldValues = FieldValues>({
  value,
  onFocus,
  onBlur,
  height = '40rem',
  borderRadius = '1.6rem',
  name,
  registerOptions,
  ...restTextAreaProps
}: TextAreaProps<TFieldValues>) => {
  // 추후에 포커스 될 때를 위해 추가
  const [isFocused, setIsFocused] = useState(false);
  const { register } = useFormContext<TFieldValues>();

  return (
    <TextareaContainer borderRadius={borderRadius} isFocused={isFocused}>
      <Textarea
        value={value}
        height={height}
        onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        {...(!!name && register(name, { ...registerOptions }))}
        {...restTextAreaProps}
      />
    </TextareaContainer>
  );
};

export default RHFTextArea as <TFieldValues extends FieldValues = FieldValues>(
  props: TextAreaProps<TFieldValues>,
) => ReactElement;
