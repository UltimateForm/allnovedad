import { Button, TextField, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

interface IQueryFormProps {
	keywords: string;
	source: string;
	loading: boolean;
	handleSubmit: (values: { keywords: string; source?: string }) => void;
}

const useStyles = makeStyles((theme:Theme) => ({
	root: {
		position: "sticky",
		top: 0,
		padding: "1rem",
		backgroundColor: theme.palette.background.default,
		zIndex: 1,
		boxShadow: theme.shadows[2]
	},
}));
export function QueryForm(props: IQueryFormProps) {
	const { handleSubmit, keywords, loading } = props;
	const [localKeywords, setLocalKeywords] = React.useState("");
	React.useEffect(() => {
		setLocalKeywords(keywords);
	}, [keywords]);
	const classes = useStyles();
	return (
		<form
			className={classes.root}
			onSubmit={(event) => {
				event.preventDefault();
				handleSubmit({ keywords: localKeywords });
			}}
		>
			<TextField
				label="Keywords"
				variant="filled"
				name="keywords"
				value={localKeywords}
				fullWidth={true}
				onChange={(event) => {
					setLocalKeywords(event.target.value);
				}}
				disabled={loading}
				helperText="Powered by newscatcherapi.com"
			/>
		</form>
	);
}
