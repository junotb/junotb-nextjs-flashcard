import type { NextApiRequest, NextApiResponse } from 'next';

export default async function naver (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { koreanName } = req.body;

  if (method !== 'POST') {
    res.status(405).json({ message: 'HTTP Method Error' });
    return;
  }

  try {
    const querystring = new URLSearchParams({
      source: 'ko',
      target: 'en',
      text: koreanName
    }).toString();
    const api_url = `${process.env.NAVER_API_URL!}?${querystring}`;  
    await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!
      },
    })
      .then(response => response.json())
      .then(data => res.status(200).json({ englishName: data.message.result.translatedText }));    
  } catch (error) {
    res.status(500).json(error);
  }
};