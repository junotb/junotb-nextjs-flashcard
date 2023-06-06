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

  const koreanName = req.body.koreanName;

  const params = new URLSearchParams();
  params.append('source', 'ko');
  params.append('target', 'en');
  params.append('text', koreanName);

  let api_url = process.env.NAVER_API_URL;
  api_url = `${api_url}?${params.toString()}`;

  await fetch(api_url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!
    },
  })
  .then(response => res.status(200).json(response));
};

module.exports = naver;