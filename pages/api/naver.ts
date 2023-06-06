import type { NextApiRequest, NextApiResponse } from 'next';

const naver = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const koreanName = "양파";

  let api_url = `${process.env.NAVER_API_URL}?`;
  api_url += 'source=ko';
  api_url += '&target=en';
  api_url += `&text=${koreanName}`;

  await fetch(api_url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!
    },
  })
  .then((response) => res.status(200).json(response))
  .catch((error) => console.error(error));
};

module.exports = naver;