import { NextResponse } from 'next/server';

export async function POST (req: Request) {
  const { englishName } = await req.json();
  
  try {
    const api_url = `${process.env.OXFORD_API_URL}${englishName}`;
    const app_id = process.env.OXFORD_CLIENT_ID!;
    const app_key = process.env.OXFORD_CLIENT_KEY!;
    const data = await fetch(api_url, {
      method: 'GET',
      headers: {
        app_id: app_id,
        app_key: app_key
      },
    }).then(response => response.json());
    console.log(data);
    const description = data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0];
    return NextResponse.json({ description: description }, { status: 200 });    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}