import {Input, InputGroup} from "@chakra-ui/input";
import {
	Box,
	Card,
	CardBody,
	Container,
	Icon,
	IconButton,
	InputRightElement,
	Text,
	useColorMode,
	VStack
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import HeaderComponent from "../components/header";
import {HiCursorClick} from "react-icons/hi";
import {T, useTranslate} from "@tolgee/react";

export default function Home() {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState<boolean>(false);

	const t = useTranslate();

	const {colorMode} = useColorMode();
	const botColor = colorMode === "light" ? "gray.100" : "gray.900";
	const userColor = colorMode === "light" ? "gray.300" : "gray.700";

	// auto scroll to bottom
	const divRef = useRef(null);
	useEffect(() => {
		// @ts-ignore
		divRef.current.scrollIntoView({behavior: 'smooth'});
	});

	enum Sender {
		User = "You",
		Bot = "Bot",
		System = "system",
	}

	interface Message {
		message: string;
		sender: Sender;
		defaultMessage?: boolean;
	}

	const defaultMessages: Message[] = [
		{
			message: "Bot is a chatbot that reluctantly answers questions with very sarcastic and rude responses, making fun of the user:",
			sender: Sender.System,
			defaultMessage: true,
		},
		{
			message: "How many pounds are in a kilogram?",
			sender: Sender.User,
			defaultMessage: true,
		},
		{
			message: "This again? There are 2.2 pounds in a kilogram. Please make a note of this. Maybe pick up a book to get a little smarter?",
			sender: Sender.Bot,
			defaultMessage: true,
		},
		{
			message: "What does HTML stand for?",
			sender: Sender.User,
			defaultMessage: true,
		},
		{
			message: "Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.",
			sender: Sender.Bot,
			defaultMessage: true,
		},
		{
			message: "When did the first airplane fly?",
			sender: Sender.User,
			defaultMessage: true,
		},
		{
			message: "On December 17, 1903, Wilbur and Orville Wright made the first flights. I can't believe you didn't know that.",
			sender: Sender.Bot,
			defaultMessage: true,
		},
		{
			message: "What is the meaning of life?",
			sender: Sender.User,
			defaultMessage: true,
		},
		{
			message: "The meaning of life is to give life meaning. I'm not sure I can help you with that.",
			sender: Sender.Bot,
			defaultMessage: true,
		}
	];

	const [messageHistory, setMessageHistory] = useState<Message[]>(defaultMessages);

	function addResponseToHistory(botMessage: Message, userMessage: Message) {
		setMessageHistory([...messageHistory, userMessage, botMessage]);
	}

	function messageHistoryToString(): string {
		return messageHistory.map((message) => {
			return `${message.sender === "system" ? "" : message.sender + ": "}${message.message}`;
		}).join("\n");
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setLoading(true);

		let messages = messageHistoryToString();
		messages += `\n${Sender.User}: ${input}`;
		messages += `\n${Sender.Bot}:`;

		const data = await fetch("/api/openai", {
			method: "POST",
			body: JSON.stringify({
				model: "text-davinci-003",
				prompt: messages,
				max_tokens: 60,
				temperature: 0.5,
				top_p: 0.3,
				frequency_penalty: 0.5,
				presence_penalty: 0.0
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const response = await data.json();
		console.log(`Response: ${response}`);
		addResponseToHistory({message: response, sender: Sender.Bot}, {message: input, sender: Sender.User});

		setInput("");
		setLoading(false);
	}

	return (
		<>
			<HeaderComponent/>
			<Container p={15}>

				{messageHistory.map((message, index) => {
					if (!message.defaultMessage) {
						return (
							<Card m="5px" key={index} bg={message.sender === Sender.Bot ? botColor : userColor}>
								<CardBody>
									<Text>{message.sender === Sender.System ? "" : message.sender + ": "}{message.message}</Text>
								</CardBody>
							</Card>
						);
					}

				})
				}

			</Container>
			<Box maxWidth="full" p="0" m="0" mb="5">
				<VStack p="5px">
					<Box>
						<h1><T>test</T></h1>
						<form onSubmit={handleSubmit}>
							<InputGroup>
								<Input
									placeholder="Enter Input..."
									width="container.sm"
									onChange={(e) => setInput(e.target.value)}
									shadow="md"
									value={input}>
								</Input>
								<InputRightElement>
									<IconButton aria-label='Submit' icon={<Icon as={HiCursorClick}/>} variant="ghost"
									            isLoading={loading} onClick={handleSubmit}/>
								</InputRightElement>
							</InputGroup>
						</form>
					</Box>
				</VStack>
			</Box>
			<div ref={divRef}/>
		</>
	)
}