import type { NextApiRequest, NextApiResponse } from 'next';

export default async function oxford (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { englishName } = req.query;

  if (method !== 'GET') {
    res.status(405).json({ message: 'HTTP Method Error' });
    return;
  }
  
  try {
    let api_url = `${process.env.OXFORD_API_URL}${englishName}`;
    await fetch(api_url, {
      method: 'GET',
      headers: {
        app_id: process.env.OXFORD_CLIENT_ID!,
        app_key: process.env.OXFORD_CLIENT_KEY!,
        language: 'en-gb',
        word_id: englishName as string
      },
    })
      .then(response => response.json())
      .then(data => res.status(200).json({ description: data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0] }));    
  } catch (error) {
    res.status(500).json(error);
  }
}