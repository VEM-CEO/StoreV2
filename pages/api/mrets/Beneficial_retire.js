export default async function handler(req, res) {
    const url = 'https://api-sandbox.mrets.org/v1/public/rec/user_transactions';
  
    const headers = {
      'x-api-key': 'rkQVa8X1ra3jkF6opuNz7VVK',
      'accept': 'application/json',
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          "type": "user_transactions",
          "attributes": {
            "transaction_type": "retirement",
            "notes": req.body.notes,
            "retirement_type": "Beneficial Ownership",
            "retirement_reason": req.body.retirement_reason
          },
          "relationships": {
            "retirement_option": {
              "data": {
                "type": "retirement_options",
                "id": "6b0f63d7-da0f-42f8-a1f4-9aac933837ee"
              }
            }
          }
        })
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      res.status(200).json(data);
      console.log(data)
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

