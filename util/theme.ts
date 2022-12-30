import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
	initialColorMode: 'dark',
	// useSystemColorMode: false,
	colorMode: 'dark',
	fontFamilies: {
		body: `'Raleway', sans-serif`,
		heading: `'Open Sans', sans-serif`,
	},
})

export default theme