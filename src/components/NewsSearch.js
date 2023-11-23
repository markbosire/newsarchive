import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = 
    {
      left: [ { id: 'msnbc', name: 'msnbc' } ],
      lean_left: [
        { id: 'abc-news', name: 'abc news' },
        { id: 'axios', name: 'axios' },
        { id: 'bloomberg', name: 'bloomberg' },
        { id: 'cbs-news', name: 'cbs news' },
        { id: 'cnn', name: 'cnn' },
        { id: 'nbc-news', name: 'nbc news' },
        { id: 'politico', name: 'politico' },
        { id: 'the-washington-post', name: 'the washington post' },
        { id: 'usa-today', name: 'usa today' }
      ],
      center: [
        { id: 'bbc-news', name: 'bbc news' },
        { id: 'newsweek', name: 'newsweek' },
        { id: 'reuters', name: 'reuters' },
        { id: 'the-hill', name: 'the hill' }
      ],
      lean_right: [
        { id: 'national-review', name: 'national review' },
        { id: 'the-wall-street-journal', name: 'the wall street journal' },
        { id: 'the-washington-times', name: 'the washington times' }
      ],
      right: [
        { id: 'fox-news', name: 'fox news' },
        {
          id: 'the-american-conservative',
          name: 'the american conservative'
        }
      ]
    }
  ;

  const searchNews = async (category) => {
    setLoading(true);

    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: 'c41f430c4fa64a92ae61f87b443e0293',
          category,
          q: searchTerm,
        },
      });

      setSearchResults((prevResults) => ({
        ...prevResults,
        [category]: response.data.articles,
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    Object.keys(categories).forEach((categoryKey) => {
      const category = categories[categoryKey];
      category.forEach((source) => searchNews(source.id));
    });
  };

  useEffect(() => {
    // Initial search when component mounts (you can adjust this as needed)
    handleSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <input
        type="text"
        placeholder="Search for news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {Object.keys(searchResults).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {searchResults[category]?.map((article) => (
              <li key={article.url}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NewsSearch;
