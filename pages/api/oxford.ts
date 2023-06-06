import type { NextApiRequest, NextApiResponse } from 'next';

const oxford = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const englishName = req.query.englishName;
  
  let api_url = `${process.env.OXFORD_API_URL}`;
  api_url += englishName;

  const response = fetch(api_url, {
    method: "GET",
    headers: {
      app_id: process.env.OXFORD_CLIENT_ID!,
      app_key: process.env.OXFORD_CLIENT_KEY!,
      language: 'en-gb',
      word_id: englishName as string
    },
  }).catch((error) => console.error(error));
  
  res.status(200).json(response);
}

module.exports = oxford;