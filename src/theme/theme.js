import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#f34343',
			main: '#f01414',
			dark: '#a80e0e',
		},
		secondary: {
			light: '#ffcf33',
			main: '#9e9e9e',
			dark: '#6e6e6e',
		},
		error: {
			light: '#b1b1b1',
			main: '#ff5555',
			dark: '#c5162c',
		},
		success: {
			light: '#54d6a7',
			main: '#00a478',
			dark: '#00744c',
		},
	},
	typography: {
		fontFamily: 'Muli, Helvetica, Arial, sans-serif',
		useNextVariants: true,
	},
	overrides: {
		MuiGrid: {
			container: {
				maxWidth: '1400px',
			},
		},
	},
});

export default theme;
