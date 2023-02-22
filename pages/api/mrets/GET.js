import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {

try {   
   
    const recData = await fetch(`${baseUrl}v1/public/rec/certificates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
            'X-Api-Key': process.env.MRETS_API_KEY,
        }}

    );
    const recDataJson = await recData.json();
    console.log(recDataJson)
    res.status(200).json(recDataJson.documents)
    break


}  catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }

});




 const baseUrl = process.env.MRETS_BASE_URL
//    const fetchHead = { 
//     'Content-Type': 'application/pdf',
//     'X-Api-Key': process.env.MRETS_API_KEY,
//         }


//   const { accessToken } = await getAccessToken(req, res);
//   const fetchOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Request-Headers": "*",
//       jwtTokenString: accessToken,
//     },
//   };


// curl --location 'https://api-sandbox.mrets.org/v1/public/rec/certificates' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --header 'X-Api-Key: rkQVa8X1ra3jkF6opuNz7VVK' \
// --header 'Cookie: ahoy_visit=01a9fcd2-b9eb-4468-ae42-93a874489339; ahoy_visitor=7d8e14b5-e89a-4864-a898-8e95d02d2dad'

// import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

// export default withApiAuthRequired(async function handler(req, res) {
//   const { accessToken } = await getAccessToken(req, res);
//   const fetchOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Request-Headers": "*",
//       jwtTokenString: accessToken,
//     },
//   };
//   const fetchBody = {
//     dataSource: process.env.MONGODB_DATA_SOURCE,
//     database: "social_butterfly",
//     collection: "flutters",
//   };
//   const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

//   try {
//     switch (req.method) {
//       case "GET":
//         const readData = await fetch(`${baseUrl}/find`, {
//           ...fetchOptions,
//           body: JSON.stringify({
//             ...fetchBody,
//             sort: { postedAt: -1 },
//           }),
//         });
//         const readDataJson = await readData.json();
//         res.status(200).json(readDataJson.documents);
//         break;
//       case "POST":
//         const flutter = req.body;
//         const insertData = await fetch(`${baseUrl}/insertOne`, {
//           ...fetchOptions,
//           body: JSON.stringify({
//             ...fetchBody,
//             document: flutter,
//           }),
//         });
//         const insertDataJson = await insertData.json();
//         res.status(200).json(insertDataJson);
//         break;
//       case "PUT":
//         const updateData = await fetch(`${baseUrl}/updateOne`, {
//           ...fetchOptions,
//           body: JSON.stringify({
//             ...fetchBody,
//             filter: { _id: { $oid: req.body._id } },
//             update: {
//               $set: {
//                 body: req.body.body,
//               },
//             },
//           }),
//         });
//         const updateDataJson = await updateData.json();
//         res.status(200).json(updateDataJson);
//         break;
//       case "DELETE":
//         const deleteData = await fetch(`${baseUrl}/deleteOne`, {
//           ...fetchOptions,
//           body: JSON.stringify({
//             ...fetchBody,
//             filter: { _id: { $oid: req.body._id } },
//           }),
//         });
//         const deleteDataJson = await deleteData.json();
//         res.status(200).json(deleteDataJson);
//         break;
//       default:
//         res.status(405).end();
//         break;
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// });
