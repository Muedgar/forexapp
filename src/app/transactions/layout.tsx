
import TopNav from "@/components/navbar/topnav";


export default function CurrenciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <TopNav title="Forex App" />
    {children}
    </>
  );
}
