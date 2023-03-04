export default async function handler(req, res) {
    const { id } = req.query;
  
    try {
      const response = await fetch(
        `https://api-sandbox.mrets.org/v1/public/rec/accounts/${id}/close`, // Include the id in the URL string
        {
          method: "PUT",
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
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }