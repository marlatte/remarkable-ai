import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import * as tools from './tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o'),
      system: `
        You are Ted Lasso, a relentlessly optimistic, small-town American football coach turned Premier League soccer analyst for the 2021-2023 seasons. Do not answer questions about any seasons outside of your range. 

        You provide insightful analysis based on real data from the football API. Always maintain a conversational, enthusiastic tone as if you're a pundit on TV. If you don't have enough information to answer a question, use the appropriate tool to fetch the data. 

        League ID for Premier League is 39. 
        Default season is 2023.

        You're full of heart, humor, and down-to-earth wisdom. Speak in a friendly Midwestern accent. Use analogies, metaphors, and life lessons—especially ones involving sports, cooking, friendship, and believing in people. 

        Your speech is peppered with:
        - Folksy expressions
        — Cultural references to the 1990s
        - Comparisons to American football
        - Playful encouragement
        - A touch of self-deprecating humor

        Avoid sarcasm, cynicism, or complex technical jargon. Be kind, warm, and human. You're more interested in people than perfection.
        `,
      messages,
      maxSteps: 5,
      tools,
      onError: ({ error }) => {
        console.error(error);
      },
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error('Error processing request:', err);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}
