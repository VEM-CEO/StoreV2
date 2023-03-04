// export default async function handler(req, res) {
//     const { accountType, name } = req.body;

//     const data = {
//         data: {
//           type: "string",
//           attributes: {
//             account_type: accountType,
//             name: name
//           }
//         }
//       };

//     try {
//         const response =await fetch(
//             'https://api-sandbox.mrets.org/v1/public/rec/accounts',
//             {
//             method: 'POST',
//             headers: {
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/vnd.api+json',
//                 'X-Api-Key': process.env.MRETS_API_KEY,
//             },
//             body: JSON.stringify(data)
//           }
//         );
//         if (!response.ok) {
//         throw new Error("Network response was not ok");
//         }

//         const responseData = await response.json();
//         res.status(200).json(responseData);
//     } catch (error) {
// console.log(error);
// res.status(500).json(error);
//     }
// }
















