'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../../utils/supabase/server';
import { getfloats } from '../float/actions';
import { getsendings } from '../sending/actions';
import { getwithdrawings } from '../withdrawing/actions';

export async function createopen(formData: FormData) {
    const supabase = createClient();
  
    // Type-casting here for convenience
    const data = [{
      amount: formData.get('amount') as string,
      time: formData.get('time')?.toString() as string,
      currencies: formData.get('currencies') as string,
      transaction_type: formData.get('transaction_type') as string
    }];

    const jsonData = JSON.stringify(data)
  
    // Insert the data into the open table
    const { error } = await supabase
      .from('open_account')
      .insert([{history: jsonData}]);
  
    if (error) {
      console.error('Error inserting data:', error);
      redirect('/error');
    } else {
      revalidatePath('/transactions', 'layout');
      redirect('/transactions');
    }
  }


  export async function updateopen(id:number, formData:FormData) {
    const supabase = createClient();
    // Type-casting here for convenience
    const data = {
      amount: formData.get('amount') as string,
      time: formData.get('time')?.toString() as string,
      currencies: formData.get('currencies') as string,
    };
  
    // Update the record in the open table where the id matches
    const { error } = await supabase
      .from('open_account')
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



  export async function getopens() {
    const supabase = createClient();

    // Select all records from the open table
    const { data, error } = await supabase
      .from('open_account')
      .select('*');

      const modified_data:any = []
      data?.map(element => {
        const new_data:any = {}
        new_data.id = element.id
        new_data.created_at = element.created_at
        new_data.user_id = element.user_id
        new_data.history = JSON.parse(element.history)

        // calculate total
        let rwanda_total = 1
        let ugandan_total = 0
        let kenyan_total = 0
        let tanzanian_total = 0
        let us_total = 0
        let euros_total = 0

        new_data?.history.forEach((d:any)=> {
          const currency = d.currencies
          switch (currency) {
            case 'Rwandan Francs':
              if(d.transaction_type.includes("float")) {
                rwanda_total = rwanda_total+Number(d.amount)
              }else {
                rwanda_total = rwanda_total-Number(d.amount)
              }
              break;
            case 'Ugandan Shillings':
                if(d.transaction_type.includes("float")) {
                  ugandan_total = ugandan_total+Number(d.amount)
                }else {
                  ugandan_total = ugandan_total-Number(d.amount)
                }
                break;
            case 'Kenyan Shillings':
              if(d.transaction_type.includes("float")) {
                kenyan_total = kenyan_total+Number(d.amount)
              }else {
                kenyan_total = kenyan_total-Number(d.amount)
              }
              break;
            case 'Tanzanian Shillings':
                if(d.transaction_type.includes("float")) {
                  tanzanian_total = tanzanian_total+Number(d.amount)
                }else {
                  tanzanian_total = tanzanian_total-Number(d.amount)
                }
                break;
            case 'US Dollars':
              if(d.transaction_type.includes("float")) {
                us_total = us_total+Number(d.amount)
              }else {
                us_total = us_total-Number(d.amount)
              }
              break;
            case 'Euros':
                if(d.transaction_type.includes("float")) {
                  euros_total = euros_total+Number(d.amount)
                }else {
                  euros_total = euros_total-Number(d.amount)
                }
                break;
            default:
              break;
          }
        }) 
        new_data.rwanda_total = rwanda_total
        new_data.ugandan_total = ugandan_total
        new_data.kenyan_total = kenyan_total
        new_data.tanzanian_total = tanzanian_total
        new_data.us_total = us_total
        new_data.euros_total = euros_total
        modified_data.push(new_data)
      });

 

    if (error) {
      console.error('Error fetching data:', error);
      return [];
    } else {
      return modified_data;
    }
}

export async function getopenById(id:number) {
  const supabase = createClient();

  // Select the record from the open table with the given ID
  const { data, error } = await supabase
    .from('open_account')
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


export async function deleteopen(id:number) {
  const supabase = createClient();
  // Delete the record in the open table where the id matches
  const { error } = await supabase
    .from('open_account')
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

export async function getopensInRange(startDate:any, endDate:any) {
  const supabase = createClient();
  // Ensure dates are in ISO format for proper querying
  const startISO = new Date(startDate).toISOString();
  const endISO = new Date(endDate).toISOString();

  // Query records between the specified start and end dates
  const { data, error } = await supabase
    .from('open_account')
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

export async function getallopen() {
  // build
  // get all float
  const floats = await getfloats()

  // build all possible weeks
  /*
    [{
      float_date: ...,
      float_week_monday: ...,
      float_week_saturday: ...,
      open_account: ...
    }]
  */

    // for this specific problem, open account is relevant in a week's context.

    // phase 1: build possible weeks from float dates which are finite, in 6 or 7 currencies
    // phase 2: for all sending and withdraw, add or subtract to each currency's open_account

    // phase 1: 
    let rwandan_francs:any = [] // possible weeks
    let ugandan_shillings:any = []
    let kenyan_shillings:any = []
    let tanzanian_shillings:any = []
    let us_dollars:any = []
    let euros:any = []

    function phaseOne() {
      // Function to get the date of Monday in the same week
    function getMondaySameWeek(date:Date) {
      const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const diffToMonday = (dayOfWeek + 6) % 7; // Calculate the difference to Monday
      const monday = new Date(date); // Create a copy of the given date
      monday.setDate(date.getDate() - diffToMonday); // Subtract the difference to get the date of Monday
      return monday;
    }
    function getSaturdaySameWeek(date:Date) {
      const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const diffToSaturday = 6 - dayOfWeek; // Calculate the difference to Saturday
      const saturday = new Date(date); // Create a copy of the given date
      saturday.setDate(date.getDate() + diffToSaturday); // Add the difference to get the date of Saturday
      return saturday;
  }
      for(let i=0;i<floats.length;i++) {
        const float_item = {
          float_date: '',
          float_amount: 0,
          float_week_monday: '',
          float_week_saturday: '',
          open_account: 0,
          currency: ''
        }
        const float_date = new Date(floats[i].time)
        float_item.float_date = float_date.toString()
        float_item.float_week_monday = getMondaySameWeek(float_date).toString()
        float_item.float_week_saturday = getSaturdaySameWeek(float_date).toString()
        float_item.open_account = Number(floats[i].amount)
        float_item.float_amount = Number(floats[i].amount)

        if(floats[i].currencies.includes('Rwandan Francs')) {
          float_item.currency = 'Rwandan Francs'
          rwandan_francs.push(float_item)
        }
        if(floats[i].currencies.includes('Ugandan Shillings')) {
          float_item.currency = 'Ugandan Shillings'
          ugandan_shillings.push(float_item)
        }
        if(floats[i].currencies.includes('Kenyan Shillings')) {
          float_item.currency = 'Kenyan Shillings'
          kenyan_shillings.push(float_item)
        }
        if(floats[i].currencies.includes('Tanzanian Shillings')) {
          float_item.currency = 'Tanzanian Shillings'
          tanzanian_shillings.push(float_item)
        }
        if(floats[i].currencies.includes('US Dollars')) {
          float_item.currency = 'US Dollars'
          us_dollars.push(float_item)
        }
        if(floats[i].currencies.includes('Euros')) {
          float_item.currency = 'Euros'
          euros.push(float_item)
        }
      }
    }

    // run phase one
    phaseOne()

   

    // phase two
    // sending
    const sendings = await getsendings()

    


    function phaseTwoSending() {
      for(let i=0;i<sendings.length;i++) {
        const send_item = sendings[i]
        if(send_item.currencies.includes('Rwandan Francs')) {
          for(let j=0;j<rwandan_francs.length;j++) {
            // check if date is in float range
            const monday = new Date(rwandan_francs[j].float_week_monday)
            const saturday = new Date(rwandan_francs[j].float_week_saturday)
            const dateItem = new Date(send_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              rwandan_francs[j].open_account = Number(rwandan_francs[j].open_account) + Number(send_item.amount)
            }
          }
          // rwandan_francs.push(float_item)
        }
        if(send_item.currencies.includes('Ugandan Shillings')) {
          for(let j=0;j<ugandan_shillings.length;j++) {
            // check if date is in float range
            const monday = new Date(ugandan_shillings[j].float_week_monday)
            const saturday = new Date(ugandan_shillings[j].float_week_saturday)
            const dateItem = new Date(send_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              ugandan_shillings[j].open_account = Number(ugandan_shillings[j].open_account) + Number(send_item.amount)
            }
          }
          // ugandan_shillings.push(float_item)
        }
        if(send_item.currencies.includes('Kenyan Shillings')) {
          for(let j=0;j<kenyan_shillings.length;j++) {
            // check if date is in float range
            const monday = new Date(kenyan_shillings[j].float_week_monday)
            const saturday = new Date(kenyan_shillings[j].float_week_saturday)
            const dateItem = new Date(send_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              kenyan_shillings[j].open_account = Number(kenyan_shillings[j].open_account) + Number(send_item.amount)
            }
          }
          // kenyan_shillings.push(float_item)
        }
        if(send_item.currencies.includes('Tanzanian Shillings')) {
          for(let j=0;j<tanzanian_shillings.length;j++) {
            // check if date is in float range
            const monday = new Date(tanzanian_shillings[j].float_week_monday)
            const saturday = new Date(tanzanian_shillings[j].float_week_saturday)
            const dateItem = new Date(send_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              tanzanian_shillings[j].open_account = Number(tanzanian_shillings[j].open_account) + Number(send_item.amount)
            }
          }
          // tanzanian_shillings.push(float_item)
        }
        if(send_item.currencies.includes('US Dollars')) {
          for(let j=0;j<us_dollars.length;j++) {
            // check if date is in float range
            const monday = new Date(us_dollars[j].float_week_monday)
            const saturday = new Date(us_dollars[j].float_week_saturday)
            const dateItem = new Date(send_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              us_dollars[j].open_account = Number(us_dollars[j].open_account) + Number(send_item.amount)
            }
          }
          // us_dollars.push(float_item)
        }
        if(send_item.currencies.includes('Euros')) {
          for(let j=0;j<euros.length;j++) {
            // check if date is in float range
            const monday = new Date(euros[j].float_week_monday)
            const saturday = new Date(euros[j].float_week_saturday)
            const dateItem = new Date(send_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              euros[j].open_account = Number(euros[j].open_account) + Number(send_item.amount)
            }
          }
          // euros.push(float_item)
        }
      }
    }

    phaseTwoSending()
    
    // withdrawing
    const withdrawings = await getwithdrawings()

    
    function phaseTwoWithdraw() {
      for(let i=0;i<withdrawings.length;i++) {
        const withdraw_item = withdrawings[i]
        if(withdraw_item.currencies.includes('Rwandan Francs')) {
          for(let j=0;j<rwandan_francs.length;j++) {
            // check if date is in float range
            const monday = new Date(rwandan_francs[j].float_week_monday)
            const saturday = new Date(rwandan_francs[j].float_week_saturday)
            const dateItem = new Date(withdraw_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              rwandan_francs[j].open_account = Number(rwandan_francs[j].open_account) - Number(withdraw_item.amount)
            }
          }
          // rwandan_francs.push(float_item)
        }
        if(withdraw_item.currencies.includes('Ugandan Shillings')) {
          for(let j=0;j<ugandan_shillings.length;j++) {
            // check if date is in float range
            const monday = new Date(ugandan_shillings[j].float_week_monday)
            const saturday = new Date(ugandan_shillings[j].float_week_saturday)
            const dateItem = new Date(withdraw_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              ugandan_shillings[j].open_account = Number(ugandan_shillings[j].open_account) - Number(withdraw_item.amount)
            }
          }
          // ugandan_shillings.push(float_item)
        }
        if(withdraw_item.currencies.includes('Kenyan Shillings')) {
          for(let j=0;j<kenyan_shillings.length;j++) {
            // check if date is in float range
            const monday = new Date(kenyan_shillings[j].float_week_monday)
            const saturday = new Date(kenyan_shillings[j].float_week_saturday)
            const dateItem = new Date(withdraw_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              kenyan_shillings[j].open_account = Number(kenyan_shillings[j].open_account) - Number(withdraw_item.amount)
            }
          }
          // kenyan_shillings.push(float_item)
        }
        if(withdraw_item.currencies.includes('Tanzanian Shillings')) {
          for(let j=0;j<tanzanian_shillings.length;j++) {
            // check if date is in float range
            const monday = new Date(tanzanian_shillings[j].float_week_monday)
            const saturday = new Date(tanzanian_shillings[j].float_week_saturday)
            const dateItem = new Date(withdraw_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              tanzanian_shillings[j].open_account = Number(tanzanian_shillings[j].open_account) - Number(withdraw_item.amount)
            }
          }
          // tanzanian_shillings.push(float_item)
        }
        if(withdraw_item.currencies.includes('US Dollars')) {
          for(let j=0;j<us_dollars.length;j++) {
            // check if date is in float range
            const monday = new Date(us_dollars[j].float_week_monday)
            const saturday = new Date(us_dollars[j].float_week_saturday)
            const dateItem = new Date(withdraw_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              us_dollars[j].open_account = Number(us_dollars[j].open_account) - Number(withdraw_item.amount)
            }
          }
          // us_dollars.push(float_item)
        }
        if(withdraw_item.currencies.includes('Euros')) {
          for(let j=0;j<euros.length;j++) {
            // check if date is in float range
            const monday = new Date(euros[j].float_week_monday)
            const saturday = new Date(euros[j].float_week_saturday)
            const dateItem = new Date(withdraw_item.time)
            if(dateItem>=monday && dateItem<=saturday) {
              euros[j].open_account = Number(euros[j].open_account) - Number(withdraw_item.amount)
            }
          }
          // euros.push(float_item)
        }
      }
    }

    phaseTwoWithdraw()


    let result  = [
      ...rwandan_francs, ...ugandan_shillings, ...kenyan_shillings, ...tanzanian_shillings, ...us_dollars, ...euros
    ]

    console.log(result)
    return result

}