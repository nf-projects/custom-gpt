import {useRouter} from 'next/router';

interface ComponentProps {
	onLanguageChange: (language: string) => void;
}

export function LangSelector ({onLanguageChange}: ComponentProps) {
	const router = useRouter();
	const setLanguage = async (lang: string) => {
		await router.replace(router.pathname, undefined, {locale: lang});
		onLanguageChange(lang);
	};

	return (
		<select
			onChange={(e) => setLanguage(e.target.value)}
			value={router.locale}
		>
			<option value="en">🇬🇧 English</option>
			<option value="de">🇩🇪 Deutsch</option>
			<option value="fr">🇫🇷 Français</option>
		</select>
	);
};