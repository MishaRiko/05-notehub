import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBox({ search, setSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(search);

  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
}
