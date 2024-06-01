
import TopNav from "@/components/navbar/topnav";


export default function DashboardLayout({
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
