import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Common';
import SvgIcon from 'public/svgs/vercel.svg';
import { ExampleWrap } from './Example.styles';

const Example = () => (
  <>
    <ExampleWrap>
      <Header />
      안녕하세요 안녕하세요 안녕하세요......
      <Image src={SvgIcon} alt="asd" width="283" height="64" />
    </ExampleWrap>
  </>
);

export default Example;
