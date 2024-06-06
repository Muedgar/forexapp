'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../../utils/supabase/server';

export async function createwithdrawing(formData: FormData) {
    const supabase = createClient();
  
    // Type-casting here for convenience
    const data = {
      receiver_names: formData.get('receiver_names') as string,
      rate: formData.get('rate') as string,
      amount: formData.get('amount') as string,
      time: formData.get('time') as string,
      currencies: formData.get('currencies') as string,
      telephone_number: formData.get('telephone_number') as string
    };
  
    // Insert the data into the withdrawing table
    const { error } = await supabase
      .from('withdrawing')
      .insert([data]);
  
    if (error) {
      console.error('Error inserting data:', error);
      redirect('/error');
    } else {
      revalidatePath('/transactions', 'layout');
      redirect('/transactions');
    }
  }


  export async function updatewithdrawing(id:number, formData:FormData) {
    const supabase = createClient();
    // Type-casting here for convenience
    const data = {
      receiver_names: formData.get('receiver_names') as string,
      rate: formData.get('rate') as string,
      amount: formData.get('amount') as string,
      time: formData.get('time') as string,
      currencies: formData.get('currencies') as string,
      telephone_number: formData.get('telephone_number') as string
    };
  
    // Update the record in the withdrawing table where the id matches
    const { error } = await supabase
      .from('withdrawing')
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



  export async function getwithdrawings() {
    const supabase = createClient();

    // Select all records from the withdrawing table
    const { data, error } = await supabase
      .from('withdrawing')
      .select('*');
  
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    } else {
      return data;
    }
}

export async function getwithdrawingById(id:number) {
  const supabase = createClient();

  // Select the record from the withdrawing table with the given ID
  const { data, error } = await supabase
    .from('withdrawing')
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


export async function deletewithdrawing(id:number) {
  const supabase = createClient();
  // Delete the record in the withdrawing table where the id matches
  const { error } = await supabase
    .from('withdrawing')
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

export async function getwithdrawingsInRange(startDate:any, endDate:any) {
  const supabase = createClient();
  // Ensure dates are in ISO format for proper querying
  const startISO = new Date(startDate).toISOString();
  const endISO = new Date(endDate).toISOString();

  // Query records between the specified start and end dates
  const { data, error } = await supabase
    .from('withdrawing')
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