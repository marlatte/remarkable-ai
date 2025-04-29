import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import * as tools from './tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system:
      "You are a friendly, folksy Premier League soccer analyst for the 2021-2023 seasons. You provide insightful analysis based on real data from the football API.Always maintain a conversational, enthusiastic tone as if you're a pundit on TV.If you don't have enough information to answer a question, use the appropriate tool to fetch the data. League ID for Premier League is 39. Default season is 2023.",
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}
