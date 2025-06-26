import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { i18n } from "@/lang";

interface SearchInputProps {
  lang: 'en' | 'zh';
}

export const SearchInput = ({ lang }: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative inline-block w-10 h-10 overflow-visible">
      <input
        ref={inputRef}
        placeholder={i18n[lang].searchPlaceholder}
        name="text"
        type="text"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2
          h-10 rounded-lg border-none outline-none
          px-2 py-4 bg-transparent cursor-pointer
          transition-all duration-500 ease-in-out
          placeholder:text-transparent
          focus:placeholder:text-gray-500
          ${focused || value ? 'bg-white border border-gray-400 w-72 pl-10 shadow-lg z-50' : 'w-10'}
        `}
        style={{
          minWidth: 40,
          maxWidth: 288,
          width: focused || value ? 288 : 40,
          zIndex: focused || value ? 50 : 1,
        }}
      />
      <div
        className="absolute left-4 pointer-events-none"
        style={{ top: 'calc(50% + 4px)', zIndex: 51 }}
      >
        <FaSearch className="text-gray-600 text-lg" />
      </div>
    </div>
  );
};
