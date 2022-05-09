import { useEffect, useState } from "react";
import "./index.css";

const NewsWheel = () => {
  const [newsArr, setNewsArr] = useState([]);

  useEffect(() => {
    const grabNews = async () => {
      const response = await fetch(
        "https://api.marketaux.com/v1/news/all?exchanges=NYSE&filter_entities=true&limit=3&published_after=2022-05-07T22:17&api_token=qgutEPJOvSiRqkWy08SR7vnbCwx3xgizxVDcdtdC"
      );
      //qgutEPJOvSiRqkWy08SR7vnbCwx3xgizxVDcdtdC
      //wJW6iStWPycCuvZaaBoPFDXJTzjKr0FGmoPANNLw
      const data = await response.json();
      setNewsArr(data.data);
    };
    grabNews();
  }, []);

  return (
    <>
      {newsArr?.map((entry, index) => (
        <div key={index} className="news-block">
          <p>{entry.title.slice(0, 20)}...</p>
          <div>
            <p>{entry.description.slice(0, 100)}...</p>
            <img src={entry.image_url} />
          </div>
          <a href={entry.url}>Link to the article</a>
        </div>
      ))}
    </>
  );
};

export default NewsWheel;
