
import { mretsGetRecipt } from "../../utils/fetcher";


export default async (req, res) => {
    if (req.method === 'POST') {
        console.log("in downloadCert.ts", req.body);
        const sessionID = req.body.sessionID;
        const getReceipt = await mretsGetRecipt(`https://api-sandbox.mrets.org/v1/public/rec/user_transactions/${sessionID}/receipt.pdf`);
        //stream the pdf to the client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        console.log(getReceipt.body.pipe(res));
        return res.status(200).json({ getReceipt: getReceipt.body.pipe(res) });
    }
};
