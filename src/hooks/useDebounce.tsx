import { useEffect, useState } from "react";

const useDebounce = (search: string, delay: number) => {
  const [value, setValue] = useState<string>(search);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(search);
    }, delay);
    return () => clearTimeout(timeout);
  }, [search, delay]);
  return value;
};

export default useDebounce;
