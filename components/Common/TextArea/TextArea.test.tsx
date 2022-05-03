import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import TextArea, { TextAreaProps } from '@/components/Common/TextArea/TextArea';

describe('<TextField />', () => {
  const value = 'initValue';

  it('초기 렌더링 시 textarea 요소가 렌더링 돼야 한다.', () => {
    const { $textarea } = renderTextField({ value });

    expect($textarea).toBeInTheDocument();
  });

  it('value 값을 받을 수 있다.', async () => {
    const { $textarea } = renderTextField({ value });

    expect($textarea).toHaveValue(value);
  });

  it('textarea에 글자를 입력하면 props로 받은 핸들러가 호출돼야 한다.', async () => {
    const { onChangeHandler, typeTextOnTextarea } = renderTextField({ value });
    const text = 'hello';

    await typeTextOnTextarea(text);

    expect(onChangeHandler).toHaveBeenCalledTimes(text.length);
  });

  it('textarea을 클릭하면 focuse 된다.', async () => {
    const { $textarea, clickInputElement } = renderTextField({ value });

    expect($textarea).not.toHaveFocus();

    await clickInputElement();

    expect($textarea).toHaveFocus();
  });

  it('focus된 상태에서 다른 부분으로 넘어가면 textarea의 focuse가 풀려야 한다.', async () => {
    const { $textarea, clickInputElement, leaveInputElementUsingTab } =
      renderTextField({ value });

    await clickInputElement();
    await leaveInputElementUsingTab();

    expect($textarea).not.toHaveFocus();
  });
});

const renderTextField = ({ value }: TextAreaProps) => {
  const onChangeHandler = jest.fn();
  const user = userEvent.setup();

  const result = render(<TextArea value={value} onChange={onChangeHandler} />);

  const $textarea = result.getByRole('textbox');

  const typeTextOnTextarea = async (text: string) => {
    await user.type($textarea, text);
  };

  const clickInputElement = async () => {
    await user.click($textarea);
  };

  const leaveInputElementUsingTab = async () => {
    await user.tab();
  };

  return {
    result,
    onChangeHandler,
    $textarea,
    typeTextOnTextarea,
    clickInputElement,
    leaveInputElementUsingTab,
  };
};
