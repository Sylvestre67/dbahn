import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#659fd1',
			main: '#3F87C6',
			dark: '#2c5e8a',
		},
		secondary: {
			light: '#ffcf33',
			main: '#ffc400',
			dark: '#b28900',
		},
		error: {
			light: '#ff8982',
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
