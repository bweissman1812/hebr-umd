import { Box, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const News = () => {
    const [newsList, setNewsList] = useState();
    const [loading, setLoading] = useState(true);

    const getNews = async () => {
        setLoading(true)
        var response = await fetch('https://newsapi.org/v2/top-headlines?country=il&apiKey=6bd79a354d054e8c81b3c76325893b9b');
        response = await response.json();

        setNewsList(response.articles);
        console.log(response);
        setLoading(false);
    }

    useEffect(() => {
        getNews()
    }, []);

    const articleClicked = (newsArticle) => {
        window.location = newsArticle.url
    }

    if (loading) {
        return (
            <>
                loading...
            </>
        )
    }
    else {
        return (
            <Box id='columns'>
                <Typography variant="h3">News Articles</Typography>

                <Box id='container'>
                    {newsList.map((newsArticle, index) => (
                        <ListItemButton id="card" key={index} onClick={() => articleClicked(newsArticle)}>
                            <Typography>{newsArticle.title}</Typography>
                        </ListItemButton>
                    ))
                    }
                </Box>
            </Box>

        )
    }
}

export default News;