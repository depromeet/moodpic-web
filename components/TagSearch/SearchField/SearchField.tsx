import TextField from '../../Common/TextField/TextField';
import React, { ChangeEvent, FormEventHandler } from 'react';
import SearchIcon from '/public/svgs/magnifyingglass.svg';

interface SearchFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}
const SearchField = ({ value, onChange, onSubmit }: SearchFieldProps) => {
  return (
    <form action="" onSubmit={onSubmit}>
      <TextField
        value={value}
        onChange={onChange}
        rightSideIcon={SearchIcon.src}
        placeholder={'궁금한 내용을 태그로 검색해보세요.'}
      />
    </form>
  );
};

export default SearchField;
