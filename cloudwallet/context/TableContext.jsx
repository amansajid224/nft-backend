import { createContext, useContext, useState } from "react";

export const TableContext = createContext({});
export const useTableContext = () => useContext(TableContext);

export const TableContextProvider = ({ children }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setSearch] = useState("search");
  const searchFn = () => {
    console.log("search");
  };
  return (
    <TableContext.Provider
      value={{ search, searchFn, globalFilter, setGlobalFilter }}
    >
      {children}
    </TableContext.Provider>
  );
};
