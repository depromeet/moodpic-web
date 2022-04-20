import React from 'react';
import Image from 'next/image';
import SvgIcon from 'public/svgs/vercel.svg';
import { ExampleWrap } from './Example.styles';

const Example = () => (
  <>
    <ExampleWrap>
      안녕하세요 안녕하세요 안녕하세요......
      <Image src={SvgIcon} alt="asd" width="250" height="64" />
    </ExampleWrap>
  </>
);

export default Example;
