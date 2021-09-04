import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { NewsGridContainer } from "components/NewsGrid";
import { QueryForm } from "components/QueryForm";
import { useDataContext } from "context/DataContext";
import React from "react";

const useStyles = makeStyles({
	loadingPane: {
		position: "absolute",
		width: "100vw",
		height: "100vh",
		zIndex: 2,
		backgroundColor: "rgb(255, 255, 255, 0.5)",
		top: "0",
		placeContent: "center",
		display: "flex",
		placeItems: "center",
	},
});

export function NewsView() {
	const { keywords, setKeywords, loading } = useDataContext();
	const classes = useStyles();
	return (
		<>
			<QueryForm
				source="bbc"
				keywords={keywords}
				handleSubmit={(values) => setKeywords(values.keywords)}
			/>
			<NewsGridContainer />
			{loading && (
				<div className={classes.loadingPane}>
					<CircularProgress />
				</div>
			)}
		</>
	);
}
