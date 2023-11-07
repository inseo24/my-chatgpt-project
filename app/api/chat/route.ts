import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  console.log(`[Request] POST /api/chat ${JSON.stringify(messages)}`);
  const apiKey = process.env.OPENAI_API_KEY
  const url = 'https://api.openai.com/v1/chat/completions'

  const payload = {
    messages,
    model: 'gpt-4-1106-preview',
    stream: false,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify((payload))
    });

    const data = await response.json()
    console.log(`[Response] POST /api/chat ${JSON.stringify(data)}`)
    return new NextResponse(JSON.stringify(data))
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}