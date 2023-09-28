import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
// import { news_api } from "../pages/env";



export function Newscard() {
  const [latestNews, setLatestNews] = useState([]);
  const newsLimit = 15; // Change this to the desired number of news articles to display

  const news_api = process.env.NEWS_API

  useEffect(() => {
    const apiKey = news_api
    const apiUrl = `https://newsapi.org/v2/everything?q=films&apiKey=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        setLatestNews(response.data.articles);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div className="flex  flex-wrap justify-center">
      {latestNews.slice(0, newsLimit).map((article, index) => (
        <Card key={index} className="mt-6 w-96 mx-6 my-12">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={article.urlToImage}
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {article.title}
            </Typography>
            <Typography>{article.description}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <a href={article.url} className="inline-block">
              <Button>Read More</Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
