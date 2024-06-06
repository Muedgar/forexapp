'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../../utils/supabase/server';

export async function createsending(formData: FormData) {
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
  
    // Insert the data into the sending table
    const { error } = await supabase
      .from('sending')
      .insert([data]);
  
    if (error) {
      console.error('Error inserting data:', error);
      redirect('/error');
    } else {
      revalidatePath('/transactions', 'layout');
      redirect('/transactions');
    }
  }


  export async function updatesending(id:number, formData:FormData) {
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
  
    // Update the record in the sending table where the id matches
    const { error } = await supabase
      .from('sending')
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



  export async function getsendings() {
    const supabase = createClient();

    // Select all records from the sending table
    const { data, error } = await supabase
      .from('sending')
      .select('*');
  
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    } else {
      return data;
    }
}

export async function getsendingById(id:number) {
  const supabase = createClient();

  // Select the record from the sending table with the given ID
  const { data, error } = await supabase
    .from('sending')
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


export async function deletesending(id:number) {
  const supabase = createClient();
  // Delete the record in the sending table where the id matches
  const { error } = await supabase
    .from('sending')
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

export async function getsendingsInRange(startDate:any, endDate:any) {
  const supabase = createClient();
  // Ensure dates are in ISO format for proper querying
  const startISO = new Date(startDate).toISOString();
  const endISO = new Date(endDate).toISOString();

  // Query records between the specified start and end dates
  const { data, error } = await supabase
    .from('sending')
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