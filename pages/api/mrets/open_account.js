// Geting all active client accounts

export default async function handler(req, res) {
    try {
    const response = await fetch(
        'https://api-sandbox.mrets.org/v1/public/rec/accounts?filter%5Baccount_type%5D=active&filter%5Bstatus%5D=open' ,
     {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.MRETS_API_KEY,
        },
     }
    )

    if (!response.ok) {
        throw new Error(response.statusText, "Network response was not ok")
    }

    const data = await response.json()
    res.status(200).json(data.data)
} catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching certificates"})

}

}