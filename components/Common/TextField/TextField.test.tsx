import React from 'react';
import TextField, {
  TextFieldProps,
} from '@/components/Common/TextField/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('', () => {
  const value = 'initValue';

  it('초기 렌더링 시 input 요소가 렌더링 돼야 한다.', () => {
    const { $input } = renderTextField({ value });

    expect($input).toBeInTheDocument();
  });

  it('value 값을 받을 수 있다.', async () => {
    const { $input } = renderTextField({ value });

    expect($input).toHaveValue(value);
  });

  it('input에 글자를 입력하면 props로 받은 핸들러가 호출돼야 한다.', async () => {
    const { onChangeHandler, typeTextOnInput } = renderTextField({ value });
    const text = 'hello';

    await typeTextOnInput(text);

    expect(onChangeHandler).toHaveBeenCalledTimes(text.length);
  });

  it('input을 클릭하면 focuse 된다.', async () => {
    const { $input, clickInputElement } = renderTextField({ value });

    expect($input).not.toHaveFocus();

    await clickInputElement();

    expect($input).toHaveFocus();
  });

  it('focus된 상태에서 다른 부분으로 넘어가면 input의 focuse가 풀려야 한다.', async () => {
    const { $input, clickInputElement, leaveInputElementUsingTab } =
      renderTextField({ value });

    await clickInputElement();
    await leaveInputElementUsingTab();

    expect($input).not.toHaveFocus();
  });
});

const renderTextField = (props: TextFieldProps) => {
  const { value } = props;

  const onChangeHandler = jest.fn();
  const user = userEvent.setup();

  const result = render(<TextField value={value} onChange={onChangeHandler} />);

  const $input = result.getByRole('textbox');

  const typeTextOnInput = async (text: string) => {
    await user.type($input, text);
  };

  const clickInputElement = async () => {
    await user.click($input);
  };

  const leaveInputElementUsingTab = async () => {
    await user.tab();
  };

  return {
    result,
    onChangeHandler,
    $input,
    typeTextOnInput,
    clickInputElement,
    leaveInputElementUsingTab,
  };
};
