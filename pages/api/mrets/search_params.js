export default async function handler(req, res, params) {
    try {
      // Build URL with query parameters based on params object
      const baseUrl = "https://api-sandbox.mrets.org/v1/public/rec/certificate_quantities";
      const queryParams = new URLSearchParams();
      queryParams.set("filter[status]", params.status || "active");
      queryParams.set("include", params.include || "account,certificate,transaction_detail");
      queryParams.set("filter[vintage]", params.vintage || "");
      queryParams.set("filter[serial_number_base]", params.serial_number_base || "");
      queryParams.set("filter[serial_number_start]", params.serial_number_start || "");
      queryParams.set("filter[serial_number_end]", params.serial_number_end || "");
      queryParams.set("filter[quantity]", params.quantity || "");
      queryParams.set("filter[import_source]", params.import_source || "");
      queryParams.set("include_relationships", "certificate_quantities,generator,generation_entry,generator_fuel,eligibilities");
      const url = `${baseUrl}?${queryParams.toString()}`;
  
      // Send request to MRETS API with necessary headers
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.MRETS_API_KEY,
        },
      });
  
      // Throw error if response is not successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Parse response data and send as JSON response
      const data = await response.json();
      res.status(200).json(data.data);
    } catch (error) {
      // Send error message as JSON response with status code 500
      console.error(error);
      res.status(500).json({ message: "Error fetching certificates" });
    }
  }