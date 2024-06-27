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
      time: formData.get('time')?.toString() as string,
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


  export async function updateMoneyExchange(id:number, formData:FormData) {
    const supabase = createClient();
    // Type-casting here for convenience
    const data = {
      exchangers_names: formData.get('exchangers_names') as string,
      rate: formData.get('rate') as string,
      amount: formData.get('amount') as string,
      time: formData.get('time')?.toString() as string,
      currencies: formData.get('currencies') as string,
    };
  
    // Update the record in the moneyexchange table where the id matches
    const { error } = await supabase
      .from('moneyexchange')
      .update(data)
      .eq('id', id);
  
    if (error) {
      console.error('Error updating data:', error);
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

export async function getMoneyExchangeById(id:number) {
  const supabase = createClient();

  // Select the record from the moneyexchange table with the given ID
  const { data, error } = await supabase
    .from('moneyexchange')
    .select('*')
    .eq('id', id)
    .single(); // Ensures only one record is fetched
  
  if (error) {
    console.error('Error fetching data:', error);
    return null;
  } else {
    return data;
  }
}


export async function deleteMoneyExchange(id:number) {
  const supabase = createClient();
  // Delete the record in the moneyexchange table where the id matches
  const { error } = await supabase
    .from('moneyexchange')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting data:', error);
    redirect('/error');
  } else {
    revalidatePath('/transactions', 'layout');
    redirect('/transactions');
  }
}

export async function getMoneyExchangesInRange(startDate:any, endDate:any) {
  const supabase = createClient();
  // Ensure dates are in ISO format for proper querying
  const startISO = new Date(startDate).toISOString();
  const endISO = new Date(endDate).toISOString();

  // Query records between the specified start and end dates
  const { data, error } = await supabase
    .from('moneyexchange')
    .select('*')
    .gte('time', startISO)
    .lte('time', endISO);

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  } else {
    return data;
  }
}