"use client";

import { createContext, useState } from "react";

export const RefreshDataTableContext = createContext();

export const RefreshDataTableProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <RefreshDataTableContext.Provider
      value={{ refresh, setRefresh, loading, setLoading }}
    >
      {children}
    </RefreshDataTableContext.Provider>
  );
};
