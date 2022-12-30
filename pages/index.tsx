import {Input} from "@chakra-ui/input";
import {Button, Container, VStack} from "@chakra-ui/react";
import {useState} from "react";
// const { Configuration, OpenAIApi } = require("openai");
//
// const configuration = new Configuration({
// 	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);


export default function Home() {
	const [input, setInput] = useState("");

	async function handleSubmit() {
		const data = await fetch("/api/hello");
		const response = await data.json();
		console.log(response);
	}

	return (
		<>
			<Container p={25}>
				<VStack>
					<Input placeholder="Enter Input..."
					       onChange={(e) => setInput(e.target.value)}
					       value={input}></Input>
					<Button onClick={handleSubmit}>Submit</Button>
				</VStack>

			</Container>

		</>
	)
}