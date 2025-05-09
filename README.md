# Remarkable AI

A new Premier League analyst joins the conversation. He's just a few years out of date.

👉 <a href="https://remarkable-ai.vercel.app/" target="_blank">Live Preview</a> 👈

## Objective

The goal of this project was to design and ship an AI-powered assistant end-to-end — from model prompting and data sourcing to frontend interaction and UX polish.

## Sources

I used [Vercel's AI SDK](https://ai-sdk.dev/docs/introduction) with OpenAI's `gpt-4o` as provider and model, respectively.

Football data is gathered from [Api-Football](https://www.api-football.com/documentation-v3), though I had to limit the scope of this assistant to the Premier League from 2021-2023 due to the restrictions of the API's free tier and limitations of time and complexity of handling multiple leagues.

## Getting Started

While it's easiest to check out the live demo above, running the project locally involves a few simple steps.

1. Fork and clone the repo to your local machine.

1. Add environment variables as shown in `.env.local.example`.

   - You may need to get your own API key for soccer data from <https://www.api-football.com/>

1. Install dependencies: `npm i`

1. Spin up a development server: `npm run dev`

1. Open <http://localhost:3000> with your browser.

1. Chat with Coach Lasso!
