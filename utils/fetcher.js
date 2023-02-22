
export const mretsGet = async (args) => {
    const response = await fetch(args, { headers: { 'X-Api-Key': process.env.MRETS_API_KEY } });
    const data = await response.json();
    return data;
};
export const mretsGetRecipt = async (args) => {
    const response = await fetch(args, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
            'X-Api-Key': process.env.MRETS_API_KEY
        }
    });
    return response;
};
export const mretsPost = async (args, dataToPost) => {
    const response = await fetch(args, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Api-Key': process.env.MRETS_API_KEY
        },
        body: JSON.stringify(dataToPost)
    });
    const data = await response.json();
    return data;
};
export const mretsPut = async (args, dataToPost) => {
    const response = await fetch(args, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Api-Key': process.env.MRETS_API_KEY
        },
        body: JSON.stringify(dataToPost)
    });
    const data = await response.json();
    return data;
};
export const fetcher = (args) => fetch(args).then(response => response.json());
