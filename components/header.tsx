import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {Box, Button, Heading, HStack, Stack, useColorMode, useToast} from "@chakra-ui/react";
import React from "react";
import {LangSelector} from "./langselector";
import {useTranslate} from "@tolgee/react";

function HeaderComponent() {
	const {colorMode, toggleColorMode} = useColorMode();
	const toast = useToast()

	const t = useTranslate();

	function onLanguageChange() {
		toast({
			title: t("lang_change_title"),
			description: t("lang_change_desc"),
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "bottom-right",
		})
	}

	return (
		<>
			<Box
				position="sticky"
				top="0"
				zIndex="1"
				backgroundColor={colorMode === "light" ? "gray.100" : "gray.900"}
			>
				<Stack isInline spacing={8} align="center" justifyContent="space-between" margin="5px">
					<HStack marginX="10px">
						<Heading fontSize="2xl">Custom GPT</Heading>
					</HStack>
					<HStack>
						<Button
							onClick={toggleColorMode}
							variant="ghost"
							colorScheme="teal"
							size="sm"
							marginX="10px"
						>
							{colorMode == "dark" ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
							{colorMode == "light" ? (t("light_mode")) : (t("dark_mode"))}
						</Button>
						<LangSelector  onLanguageChange={onLanguageChange}/>
					</HStack>
				</Stack>
				<Box>
					<hr></hr>
				</Box>
			</Box>
		</>
	);
}

export default HeaderComponent;