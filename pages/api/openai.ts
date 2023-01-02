// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const {Configuration, OpenAIApi} = require("openai");

	// const configuration = new Configuration({
	// 	apiKey: process.env.OPENAI_API_KEY,
	// });
	// const openai = new OpenAIApi(configuration);

	// console.log(req.body.prompt);

	// const completion = await openai.createCompletion({
	// 	model: req.body.model,
	// 	prompt: req.body.prompt,
	// 	max_tokens: req.body.max_tokens,
	// 	temperature: req.body.temperature,
	// 	top_p: req.body.top_p,
	// 	frequency_penalty: req.body.frequency_penalty,
	// 	presence_penalty: req.body.presence_penalty,
	// })
	// res.status(200).json(completion.data.choices[0].text)
	res.status(200).json({"error": "api is temp disabled"})
}
