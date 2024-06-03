import Card from "@/components/cards/card";
import BarChart from "@/components/charts/BarChart";
import Signin from "@/components/forms/signin";
import Signup from "@/components/forms/signup";
import Table from "@/components/tables/table";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";


export default async function Admin() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/')
  }
    return (
     <div className="mb-[200px]">
     </div>
    );
  }
  