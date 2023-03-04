export default async function handler(req, res) {
    // First POST request to MRETS API
    const data1 = {
      type: 'user_transactions',
      attributes: {
        transaction_type: 'retirement',
        notes: 'Meghan Additional acct test',
        retirement_type: 'Beneficial Ownership',
        retirement_reason: 'For Environmental Benefit'
      },
      relationships: {
        retirement_option: {
          data: {
            type: 'retirement_options',
            id: '6b0f63d7-da0f-42f8-a1f4-9aac933837ee'
          }
        }
      }
    };
  
    const response1 = await fetch('https://api-sandbox.mrets.org/v1/public/rec/user_transactions', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.MRETS_API_KEY,
        'accept': 'application/json',
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      
      body: JSON.stringify({ data: data1 })
    });
  
    const result1 = await response1.json();
  
    // Extract data from the first response
    const data2 = {
      type: 'transaction_details',
      attributes: {
        serial_number_start: 1,
        serial_number_end: 1
      },
      relationships: {
        user_transaction: {
          data: {
            type: 'user_transactions',
            id: result1.data.id
          }
        },
        certificate: {
          data: {
            type: 'certificates',
            id: '2a9dc98a-6d05-470f-87e8-f6277aff62de'
          }
        },
        from_account: {
          data: {
            type: 'accounts',
            id: 'de021112-49ff-491a-b9eb-08a6552533eb'
          }
        },
        to_account: {
          data: {
            type: 'accounts',
            id: 'A3192706-FCF3-4585-8CFE-3719C0FBE217'
          }
        }
      }
    };
  
    // Second POST request to MRETS API
    const response2 = await fetch('https://api-sandbox.mrets.org/v1/public/rec/transaction_details', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.MRETS_API_KEY,
        'accept': 'application/json',
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Cookie': 'ahoy_visit=d75e5ed2-c86e-4146-992a-ae7bc4aa0f71; ahoy_visitor=7d8e14b5-e89a-4864-a898-8e95d02d2dad'
      },
      body: JSON.stringify({ data: data2 })
    });
  
    const result2 = await response2.json();
  
    // Send response to the client
    res.status(200).json({ result1, result2 });
 
// Third PUT request to MRETS API
const response3 = await fetch(`https://api-sandbox.mrets.org/v1/public/rec/user_transactions/${result2.data.id}/enqueue`, {
  method: 'PUT',
  headers: {
    'x-api-key': process.env.MRETS_API_KEY,
    'accept': 'application/json',
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    'Cookie': 'ahoy_visit=f90effb1-b721-49d1-b24d-14c7cda9f6aa; ahoy_visitor=7d8e14b5-e89a-4864-a898-8e95d02d2dad'
  }
});

const result3 = await response3.json(); 

}