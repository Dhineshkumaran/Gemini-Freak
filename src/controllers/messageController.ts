import dotenv from 'dotenv';
import { Request, Response } from "express";
import { GoogleGenerativeAI }  from "@google/generative-ai";
dotenv.config();

// You can define this interface for future use
// interface RequestBody {
//     model: string,
// }

const messageController = async (req: Request, res: Response) => {
    try {
        let responseText: string = "";
        const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = req.params.message;

        const result = await model.generateContent(prompt);
        responseText += result.response.text();
        console.log(responseText);
        
        res.status(200).send({ success: true, message: responseText });
    } catch (error) {
        console.error("Error fetching completion:", error);
        res.status(500).send({ success: false, error: "Failed to fetch completion" });
    }
}

export default messageController;

// curl \
//   -H 'Content-Type: application/json' \
//   -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
//   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCtIntCqt9sLCuvKhx1hTcGOpLJX_BRiVU'