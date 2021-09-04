import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppProps } from "next/dist/shared/lib/router/router";
import { red, orange } from "@material-ui/core/colors";
import { DataContextProvider } from "context/DataContext";

const theme = createTheme({
	palette: {
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles?.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<meta name="description" content="All Novedad" />
				<meta name="keywords" content="news,scrapper" />
				<title>aNov</title>
				<meta name="theme-color" content={orange.A700} />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<DataContextProvider>
					<Component {...pageProps} />
				</DataContextProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
