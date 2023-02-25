
  export default async function handler(req, res) {
    try {
      const response = await fetch(
        "https://api-sandbox.mrets.org/v1/public/rec/certificates/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.MRETS_API_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } 
  
      const data = await response.json();
      res.status(200).json(data.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching certificates" });
    }
  }