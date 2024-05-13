import { NextResponse } from 'next/server';

export async function POST (req: Request) {
  const { koreanName } = await req.json();

  try {
    const api_url = process.env.NAVER_API_URL!;  
    const data = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLIENT_ID!,
        'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET!
      },
      body: new URLSearchParams({
        source: 'ko',
        target: 'en',
        text: koreanName
      })
    }).then(response => response.json());
    console.log(data);
    const englishName = data.message.result.translatedText;

    return NextResponse.json({ englishName: englishName }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};