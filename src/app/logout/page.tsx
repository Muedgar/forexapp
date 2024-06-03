
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";


export default async function Admin() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()
    if(error) redirect('/admin')
    
    redirect('/')
  }
  