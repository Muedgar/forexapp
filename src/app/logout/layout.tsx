
import TopNav from "@/components/navbar/topnav";
import { createClient } from "../../../utils/supabase/server";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <>
    {children}
    </>
  );
}
