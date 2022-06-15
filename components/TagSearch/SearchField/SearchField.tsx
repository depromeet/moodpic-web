import TextField from '../../Common/TextField/TextField';
import React, { ChangeEvent, FormEvent } from 'react';
import SearchIcon from '/public/svgs/magnifyingglass.svg';
import { Tag } from '../../../shared/type/post';

interface SearchFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (searchedTag: Tag) => void;
}
const SearchField = ({ value, onChange, onSubmit }: SearchFieldProps) => {
  return (
    <form
      action=""
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
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
