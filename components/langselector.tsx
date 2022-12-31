import {useRouter} from 'next/router';

export function LangSelector () {
	const router = useRouter();
	const setLanguage = (lang: string) => {
		router.replace(router.pathname, undefined, { locale: lang });
	};

	return (
		<select
			onChange={(e) => setLanguage(e.target.value)}
			value={router.locale}
		>
			<option value="en">🇬🇧 English</option>
			<option value="de">🇩🇪 Deutsch</option>
		</select>
	);
};