'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../utils/supabase/server'

export async function createMoneyExchange(formData: FormData) {
    const supabase = createClient();
  
    // Type-casting here for convenience
    const data = {
      exchangers_names: formData.get('exchangers_names') as string,
      rate: formData.get('rate') as string,
      amount: formData.get('amount') as string,
      time: formData.get('time') as string,
      currencies: formData.get('currencies') as string,
    };
  
    // Insert the data into the moneyexchange table
    const { error } = await supabase
      .from('moneyexchange')
      .insert([data]);
  
    if (error) {
      console.error('Error inserting data:', error);
      redirect('/error');
    } else {
      revalidatePath('/transactions', 'layout');
      redirect('/transactions');
    }
  }




  export async function getMoneyExchanges() {
    const supabase = createClient();

    // Select all records from the moneyexchange table
    const { data, error } = await supabase
      .from('moneyexchange')
      .select('*');
  
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    } else {
      return data;
    }
}