import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Link,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { useDataContext } from "context/DataContext";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles({
	root: {
		padding: "0.5rem",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		placeContent: "space-around",
	},
	cardRoot: {
		margin: "0.25rem",
		maxWidth: 345,
		height:"max-content"
	},
	media: {
		height: 140,
	},
	cardContent: {
		maxHeight: "400px",
		textOverflow: "ellipsis",
		overflow: "hidden",
	},
	cardContentBody: {
		maxHeight: "400px",
		textOverflow: "ellipsis",
		overflow: "hidden",
	},
	cardActions: {
		placeContent: "space-between",
	},
});

interface INewsGridProps {
	newsData: Record<string, any>;
	keywords: string;
}

export function NewsGrid(props: INewsGridProps) {
	const { newsData, keywords } = props;
	const [itemsToRender, setItemsToRender] = React.useState([]);
	const classes = useStyles();
	const totalCount = newsData?.totalCount;
	React.useEffect(() => {
		if (newsData && newsData.articles)
			setItemsToRender(newsData.articles.slice(0, 10));
	}, [newsData, totalCount]);
	if (!newsData || !newsData.articles) {
		return <div className={classes.root}>No news</div>;
	}
	const loadMoreNews = () => {
		setItemsToRender(newsData.articles.slice(0, itemsToRender.length + 10));
	};
	return (
		<InfiniteScroll
			className={classes.root}
			dataLength={itemsToRender.length}
			next={loadMoreNews}
			hasMore={itemsToRender.length < newsData.articles.length}
			loader={<h4>Loading...</h4>}
			endMessage={
				<p style={{ textAlign: "center" }}>
					<b>No more news, go seize the means of production now</b>
				</p>
			}
		>
			{itemsToRender.map((n, i) => (
				<Card className={classes.cardRoot} key={i}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image={n.media}
							title={n.title}
						/>

						<CardContent className={classes.cardContent}>
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
								className={classes.cardContentBody}
							>
								{n.title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{n.summary}
							</Typography>
						</CardContent>
						<CardActions className={classes.cardActions}>
							Source: {n.clean_url}
							<Link href={n.link} target="_blank">
								Read
							</Link>
						</CardActions>
					</CardActionArea>
				</Card>
			))}
		</InfiniteScroll>
	);
}

export function NewsGridContainer() {
	const { newsData, keywords } = useDataContext();
	return <NewsGrid newsData={newsData} keywords={keywords} />;
}
