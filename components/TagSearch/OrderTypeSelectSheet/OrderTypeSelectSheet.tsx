import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { TAG_SEARCH_ORDER_TYPE, TagSearchOrderType } from '../../../shared/constants/tagSearch';

interface OrderTypeSelectSheetProps {
  onClickOption: (orderType: TagSearchOrderType) => void;
}
const OrderTypeSelectSheet = ({ onClickOption }: OrderTypeSelectSheetProps) => {
  return (
    <Container>
      <OrderTypeOption onClick={() => onClickOption(TAG_SEARCH_ORDER_TYPE.NEWEST)}>최신순</OrderTypeOption>
      <Hr />
      <OrderTypeOption onClick={() => onClickOption(TAG_SEARCH_ORDER_TYPE.POPULARITY)}>인기순</OrderTypeOption>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.4rem 1.8rem;
`;

const OrderTypeOption = styled.div`
  color: ${theme.colors.white};
  ${theme.fonts.h5};
  margin: 2.2rem 0;
`;

const Hr = styled.hr`
  border: solid 0.1rem ${theme.colors.gray3};
`;

export default OrderTypeSelectSheet;
