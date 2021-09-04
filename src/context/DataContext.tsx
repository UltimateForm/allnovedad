import React from "react";

const DataContext = React.createContext<Record<string, any>>({});

export function DataContextProvider(props: { children: React.ReactNode }) {
	const [newsData, setNewsData] = React.useState<Record<string, any>>({});
	const [loading, setLoading] = React.useState(false);
	const [keywords, setKeywords] = React.useState("");
	React.useEffect(() => {
		const cachedNews = window.localStorage.getItem("ctx.newsData");
		if (cachedNews) {
			try {
				const parsedNews = JSON.parse(cachedNews);
				if (typeof parsedNews === "object") setNewsData(parsedNews);
			} catch (error) {
				console.error("COULD NOT PARSE CACHED NEWS:", error);
			}
		}

		const cachedKeywords = window.localStorage.getItem("ctx.keywords");
		if (cachedKeywords) {
			try {
				if (typeof cachedKeywords === "string") setKeywords(cachedKeywords);
			} catch (error) {
				console.error("COULD NOT PARSE CACHED KEYWORDS:", error);
			}
		}
	}, []);
	const keywordsSetter = React.useCallback(
		(keywords) => {
			window.localStorage.setItem("ctx.keywords", keywords);
			setLoading(true);
			(async function () {
				const threeDaysAgo = new Date();
				threeDaysAgo.setDate(threeDaysAgo.getDate() - 5);
				var myHeaders = new Headers();
				myHeaders.append("x-rapidapi-key", process.env.NEXT_PUBLIC_RAPID_KEY);

				const fetchResponse = await fetch(
					`https://free-news.p.rapidapi.com/v1/search?q=${keywords}&lang=en`,
					{
						method: "GET",
						headers: myHeaders,
						redirect: "follow",
					}
				);
				if (!fetchResponse.ok) {
					setNewsData(() => {
						setLoading(false);
						return {};
					});
				}
				const data = await fetchResponse.json();
				window.localStorage.setItem("ctx.newsData", JSON.stringify(data));
				setNewsData(() => {
					setLoading(false);
					return data;
				});
			})();
		},
		[keywords]
	);
	return (
		<DataContext.Provider
			value={{
				loading,
				keywords,
				setKeywords: keywordsSetter,
				newsData,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
}

export function useDataContext() {
	const value = React.useContext(DataContext);
	return value;
}
