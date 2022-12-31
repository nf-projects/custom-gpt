import "../styles/globals.css";
import type {AppProps} from "next/app";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../util/theme";
import enLocale from '../i18n/en.json';
import deLocale from '../i18n/de.json';
import frLocale from '../i18n/fr.json';
import {TolgeeProvider} from "@tolgee/react";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
	const { locale: activeLocale } = useRouter();

	return (
		<TolgeeProvider
			forceLanguage={activeLocale}
			apiKey={process.env.NEXT_PUBLIC_TOLGEE_API_KEY}
			apiUrl={process.env.NEXT_PUBLIC_TOLGEE_API_URL}
			staticData={{
				en: enLocale,
				de: deLocale,
				fr: frLocale,
			}}
		>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</TolgeeProvider>

	);
}

export default MyApp;