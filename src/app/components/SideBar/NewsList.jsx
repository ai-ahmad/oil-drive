import React, { useState, useEffect } from 'react';
import NewsItem from './NewItem'; // Importing the NewsItem component

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Fetch the news data from the API
        fetch('http://localhost:5000/api/v1/news')
            .then((response) => response.json())
            .then((data) => setNews(data))
            .catch((error) => console.error('Error fetching news:', error));
    }, []);

    return (
        <div className=" bg-gray-100 w-1/5 min-w-[250px]">
            <div className="w-full bg-red-600 text-white p-2 mb-4">
                <h2 className="font-bold">Наши новости</h2>
            </div>
            {news.map((newsItem) => (
                <NewsItem key={newsItem._id} newsItem={newsItem} />
            ))}
        </div>
    );
};

export default NewsList;
