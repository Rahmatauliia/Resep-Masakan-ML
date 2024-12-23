import { RefreshDataTableProvider } from "@/context/RefreshDataTableContext";

export default function ResepLayout({ children }) {
  return <RefreshDataTableProvider>{children}</RefreshDataTableProvider>;
}
