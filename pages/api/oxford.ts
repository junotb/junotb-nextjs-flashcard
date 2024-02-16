import type { NextApiRequest, NextApiResponse } from 'next';

const oxford = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: "HTTP Method Error"
    });
  }

  const { englishName } = req.query;
  
  let api_url = `${process.env.OXFORD_API_URL}${englishName}`;

  const response = await fetch(api_url, {
    method: "GET",
    headers: {
      app_id: process.env.OXFORD_CLIENT_ID!,
      app_key: process.env.OXFORD_CLIENT_KEY!,
      language: 'en-gb',
      word_id: englishName as string
    },
  });
  const jsonData = await response.json();
  res.status(200).json({ description: jsonData.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0] });
}

module.exports = oxford;