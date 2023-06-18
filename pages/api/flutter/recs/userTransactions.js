import fetch from 'node-fetch';
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from 'next';

function getTypeDetails(type) {
  switch (type) {
    case "retirement options":
      return "0de80d17-9ff7-4f90-b925-efb1fa2980b1";
    case "Green Pricing":
      return "2e0c07e3-201d-4336-a047-86d0cef08c7e";
    case "Recs Sold":
      return "5d404532-c707-49c4-b52c-82d674938145";
    case "Beneficial Ownership":
      return "6b0f63d7-da0f-42f8-a1f4-9aac933837ee";
    case "State Portfolio Standards":
      return "8600b84c-72b9-4f1d-92c8-98c0d02f6d56";
    case "Non_RPS_Compliance":
      return "9cb5ceb3-fc4c-4990-ba";
    default:
      return null;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    const { attributes } = data;
    const { retirement_type } = attributes;

    // Get the ID based on the retirement type
    const id = getTypeDetails(retirement_type);

    const requestData = {
      data: {
        type: "user_transactions",
        attributes: {
          transaction_type: "retirement",
          notes: attributes.notes,
          retirement_type: attributes.retirement_type,
          retirement_reason: attributes.retirement_reason,
          
        },
        relationships: {
          retirement_option: {
            data: {
              type: "retirement_options",
              id: id
            }
          }
        }
      }
    };

    try {
      const response = await fetch(
        'https://api-sandbox.mrets.org/v1/public/rec/user_transactions',
        {
          method: 'POST',
          headers: {
            jwtTokenString: accessToken,
            'accept': 'application/json',
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
          },
          body: JSON.stringify(requestData)
        }
      );

      const responseData = await response.json();

      console.log("Response data:", responseData); // Log the response data received from the API

      // Extract the transaction ID from the response data
      const transactionId = responseData.data.id;

      // Request transaction details
      const transactionDetailsRequest = {
        data: {
          type: "transaction_details",
          attributes: {
            serial_number_start: 1,
            serial_number_end: 1
          },
          relationships: {
            user_transaction: {
              data: {
                type: "user_transactions",
                id: transactionId
              }
            },
            certificate: {
              data: {
                type: "certificates",
                id: "2a9dc98a-6d05-470f-87e8-f6277aff62de"
              }
            },
            from_account: {
              data: {
                type: "accounts",
                id: "de021112-49ff-491a-b9eb-08a6552533eb"
              }
            },
            to_account: {
              data: {
                type: "accounts",
                id: "A3192706-FCF3-4585-8CFE-3719C0FBE217"
              }
            }
          }
        }
      };

      const transactionDetailsResponse = await fetch(
        'https://api-sandbox.mrets.org/v1/public/rec/transaction_details',
        {
          method: 'POST',
          headers: {
            jwtTokenString: accessToken,
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transactionDetailsRequest)
        }
      );

      const transactionDetailsData = await transactionDetailsResponse.json();

      console.log("Transaction details data:", transactionDetailsData);

      res.status(response.status).json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
