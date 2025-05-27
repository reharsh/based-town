import { groq } from "@ai-sdk/groq"
import { createOpenAI } from "@ai-sdk/openai"
import { generateObject, streamText } from "ai"
import express, { Router, type Request, type Response } from "express"
import { z } from "zod"
import cors from "cors"
 
const aiRouter = Router()

aiRouter.use(express.json())
aiRouter.use(cors())

const openai = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1/chat/completions",
    apiKey: `${process.env.AI_API_KEY}`
})

// Define your routes here
aiRouter.get('/', (req, res) => {
    console.log(`${process.env.AI_API_KEY}`)
    res.send('this is ai route');
});


aiRouter.post('/chat', async (req: Request, res: Response) => {
  const { prompt } = req.body;
const result = streamText({
  model: openai('llama-3.3-70b-versatile'),
  maxTokens: 512,
  temperature: 0.3,
  maxRetries: 5,
  prompt: prompt,
});

for await (const textPart of result.textStream) {
  console.log(textPart);
  res.write(textPart);
}

res.end();

});


aiRouter.post('/start', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  console.log(prompt);
  const result = await generateObject({
    model: groq('llama-3.3-70b-versatile'),
    system: "You generate short quiz from given topic, quiz chapters should be structured as levels (3-5 levels max, 3-5 questions in each level) with increasing difficulty. also each level should have postition(x,y) coordinates which lies on 500x500 grid randomly spreaded. Each question should have 4 options (a,b,c,d) and one correct answer.",
    prompt,
    schema: z.object({
      quizzes: z.array(
        z.object({
          level: z.string().describe('Name of Level'),
          questions: z.array(
            z.object({
              question: z.string().describe('Question content'),
              options: z.string().describe('4 options a,b,c,d.'),
              correct: z.string().describe('correct option (a or b or c or d)')
            })
          ),
          position: z.object({
            x: z.number().describe('x coordinate'),
            y: z.number().describe('y coordinate')
          })
        }),
      ),
    }),
  });
  res.json(result);
})

  export default aiRouter;
