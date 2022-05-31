import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Letter from '../../public/svgs/letter.svg';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Share = () => {
  const userName = '가나다라마바사';
  const [senderName, setSenderName] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  const changeSenderName = (event: ChangeEvent<HTMLInputElement>) => {
    setSenderName(event.target.value);
  };

  const changeRecipientName = (event: ChangeEvent<HTMLInputElement>) => {
    setSenderName(event.target.value);
  };

  return (
    <div>
      <IconWrap>
        <Image src={Letter} alt="CheckCirclePr" />
      </IconWrap>
      <Message>{userName}님의 감정을 전해보세요.</Message>
      <SenderInformation>
        <To>To.</To>
        <SenderInput value={recipient} onChange={changeRecipientName} />
      </SenderInformation>

      <SenderInformation>
        <To>From.</To>
        <SenderInput value={senderName} onChange={changeSenderName} />
      </SenderInformation>
    </div>
  );
};

const IconWrap = styled.div`
  display: flex;
  margin-right: 8px;
  width: 18px;
  height: 18px;
`;

const Message = styled.span`
  color: ${theme.colors.white};
`;

const SenderInformation = styled.div`
  display: flex;
`;

const To = styled.p`
  ${theme.fonts.h3}
  color: ${theme.colors.white}
`;

const SenderInput = styled.input`
  margin-left: 0.8rem;
`;

export default Share;
