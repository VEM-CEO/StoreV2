// Geting all active client accounts

export default async function handler(req, res) {
    try {
      const id = req.query.id; // Get the id from the query string
  
      const response = await fetch(
        `https://api-sandbox.mrets.org/v1/public/rec/accounts/${id}`, // Include the id in the URL string
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.MRETS_API_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status} ${response.statusText}  `
          
          
        );
       
      }
  
      const data = await response.json();
      res.status(200).json(data.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching certificates" });
    }
  }