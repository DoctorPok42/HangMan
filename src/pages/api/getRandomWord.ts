import { NextApiRequest, NextApiResponse } from "next";

export default async function getRandomWord(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&lang=en');
        const data = await response.json();

        res.status(200).json({ word: data[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
}
