import { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useSearchParams } from "react-router";

export const Search = ({ placeholder }: { placeholder: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(keywordParam);

  useEffect(() => {
    setKeyword(keywordParam);
  }, [keywordParam]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (event.code === "Enter") {
      if (keyword.trim()) {
        params.set("keyword", keyword);
      } else {
        params.delete("keyword");
      }
    }
    setSearchParams(params);
  };

  const handleClear = () => {
    setKeyword("");
    const params = new URLSearchParams(searchParams);
    params.delete("keyword");
    setSearchParams(params);
  };

  return (
    <div className="border-travel-gray-300 has-focus:border-travel-primary hover:border-travel-primary inline-flex h-9 w-62.5 items-center gap-4 rounded-sm border bg-white px-3 text-sm font-medium transition-all duration-300 hover:shadow-md has-focus:shadow-md">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        placeholder={placeholder}
        className="h-full flex-1"
      />
      {keyword && (
        <FaRegCircleXmark
          onClick={handleClear}
          className="text-travel-red cursor-pointer text-lg"
        />
      )}
    </div>
  );
};
