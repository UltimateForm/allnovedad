import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

interface IQueryFormProps {
	keywords: string;
	source: string;
	handleSubmit: (values: { keywords: string; source?: string }) => void;
}

const useStyles = makeStyles({
	root: {
		position: "sticky",
		top: 0,
		padding: "1rem",
		backgroundColor: "white",
		zIndex: 1,
	},
});
export function QueryForm(props: IQueryFormProps) {
	const { handleSubmit, keywords } = props;
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
				helperText="Powered by newscatcherapi.com"
			/>
		</form>
	);
}
