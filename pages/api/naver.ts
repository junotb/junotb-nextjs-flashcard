import type { NextApiRequest, NextApiResponse } from 'next';

const naver = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: "HTTP Method Error"
    });
  }

  const { koreanName } = req.body;

  const params = new URLSearchParams();
  params.append('source', 'ko');
  params.append('target', 'en');
  params.append('text', koreanName);

  let api_url = process.env.NAVER_API_URL;
  api_url = `${api_url}?${params.toString()}`;
  
  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!
    },
  });
  const jsonData = await response.json();
  res.status(200).json({ englishName: jsonData.message.result.translatedText });
};

module.exports = naver;