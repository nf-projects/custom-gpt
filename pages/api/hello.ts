// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const {Configuration, OpenAIApi} = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world, what is your name?",
  });
  res.status(200).json({"output": completion.data.choices[0].text})
}
