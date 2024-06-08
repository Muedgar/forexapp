import Card from "@/components/cards/card";
import BarChart from "@/components/charts/BarChart";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import TableCurrencyExchange from "@/components/tables/tablecurrencyexchange";


export default async function Currencies() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/')
  }
    return (
     <div className="mb-[200px]">
      <Card />
      {/* add cards with nice static charts ui/ux */}
      {/* <BarChart />  */}
      <TableCurrencyExchange />
     </div>
    );
  }
  