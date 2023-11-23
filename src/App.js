// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NewsCategory from './components/NewsCategory';
import Navbar from './components/Navbar';
import LeftWingArticles from './data/newLeftArticles.json'
import RightWingArticles from './data/newRightArticles.json'
import LeanLeftArticles from './data/newLeanLeftArticles.json'
import LeanRightArticles from './data/newLeanRightArticles.json'
import CenterArticles from './data/newCenterArticles.json'
const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [leftWingArticles, setLeftWingArticles] = useState([]);
const [leanLeftArticles, setLeanLeftArticles] = useState([]);
const [centerArticles, setCenterArticles] = useState([]);
const [leanRightArticles, setLeanRightArticles] = useState([]);
const [rightWingArticles, setRightWingArticles] = useState([]);
const [loaded,setLoaded] = useState(false)
const fetchArticlesByCategory = async (category, searchTerm) => {
  const apiKey = '70ec5710d35f444db6bf32becdcf9346';


  const categoryRequests = category.map(source =>
    axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        apiKey,
        sources: source.id,
        q: searchTerm,
        pageSize: 1, // Show only the top news
        sortBy: 'relevancy',
      },
    })
  );

  try {
    const categoryResponses = await Promise.all(categoryRequests);
    const categoryArticles = categoryResponses.reduce(
      (accumulator, response, index) => {
        console.log(category[index].logoUrl)
       
        const articlesWithUrl = response.data.articles.map(article => ({
          ...article,
          logoUrl: category[index].logoUrl, // Add the url property
        }));
        return [...accumulator, ...articlesWithUrl];
      },
      []
    );
    console.log(categoryArticles)
    return categoryArticles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};


const fetchCombinedArticles = async () => {
 
  const categories= {
    left: [
      {
        id: 'msnbc',
        name: 'msnbc',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/MSNBC_logo_%282009-2015%29.svg/1000px-MSNBC_logo_%282009-2015%29.svg.png'
      }
    ],
    lean_left: [
      {
        id: 'abc-news',
        name: 'abc news',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/ABC_News_Live_logo.svg/181px-ABC_News_Live_logo.svg.png'
      },
      {
        id: 'axios',
        name: 'axios',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Axios_logo_%282017%29.svg/512px-Axios_logo_%282017%29.svg.png'
      },
      {
        id: 'bloomberg',
        name: 'bloomberg',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bloomberg_Businessweek_logo.svg/404px-Bloomberg_Businessweek_logo.svg.png'
      },
      {
        id: 'cbs-news',
        name: 'cbs news',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/CBS_Evening_News_horizontal_2022.svg/500px-CBS_Evening_News_horizontal_2022.svg.png'
      },
      {
        id: 'cnn',
        name: 'cnn',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/379px-CNN.svg.png'
      },
      {
        id: 'nbc-news',
        name: 'nbc news',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/NBC_News_%282023%29.svg/239px-NBC_News_%282023%29.svg.png'
      },
      {
        id: 'politico',
        name: 'politico',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Logo_PMBR.svg/199px-Logo_PMBR.svg.png'
      },
      {
        id: 'the-washington-post',
        name: 'the washington post',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Logo_of_The_Washington_Post_Newspaper.svg/463px-The_Logo_of_The_Washington_Post_Newspaper.svg.png'
      },
      {
        id: 'usa-today',
        name: 'usa today',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/USA_Today_2012logo.svg/342px-USA_Today_2012logo.svg.png'
      }
    ],
    center: [
      {
        id: 'bbc-news',
        name: 'bbc news',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/BBC_News_2022_%28Alt%29.svg/281px-BBC_News_2022_%28Alt%29.svg.png'
      },
      {
        id: 'newsweek',
        name: 'newsweek',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Newsweek_Logo.svg/703px-Newsweek_Logo.svg.png'
      },
      {
        id: 'reuters',
        name: 'reuters',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Reuters_logo.svg/1024px-Reuters_logo.svg.png'
      },
      {
        id: 'the-hill',
        name: 'the hill',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/SILENT_HILL_2_LOGO_%28Alt.%29.svg/512px-SILENT_HILL_2_LOGO_%28Alt.%29.svg.png'
      }
    ],
    lean_right: [
      {
        id: 'national-review',
        name: 'national review',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Los_Alamos_National_Laboratory_logo_2001-2021.svg/393px-Los_Alamos_National_Laboratory_logo_2001-2021.svg.png'
      },
      {
        id: 'the-wall-street-journal',
        name: 'the wall street journal',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/The_Wall_Street_Journal_Logo.svg/301px-The_Wall_Street_Journal_Logo.svg.png'
      },
      {
        id: 'the-washington-times',
        name: 'the washington times',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/The_Washington_Times_%282019-10-31%29.svg/562px-The_Washington_Times_%282019-10-31%29.svg.png'
      }
    ],
    right: [
      {
        id: 'fox-news',
        name: 'fox news',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/180px-Fox_News_Channel_logo.svg.png'
      },
      {
        id: 'the-american-conservative',
        name: 'the american conservative',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/The_American_Conservative_logo_2019.svg/137px-The_American_Conservative_logo_2019.svg.png'
      }
    ]
  }

  const leftWingArticles = await fetchArticlesByCategory(categories.left, searchTerm);
  const leanLeftArticles = await fetchArticlesByCategory(categories.lean_left, searchTerm);
  const centerArticles = await fetchArticlesByCategory(categories.center, searchTerm);
  const leanRightArticles = await fetchArticlesByCategory(categories.lean_right, searchTerm);
  const rightWingArticles = await fetchArticlesByCategory(categories.right, searchTerm);
  console.log(leftWingArticles)
  console.log(rightWingArticles)
  maxTitle(leftWingArticles)
  maxTitle(leanLeftArticles)
  maxTitle(centerArticles)
  maxTitle(leanRightArticles)
  maxTitle(rightWingArticles)
  setLeftWingArticles(leftWingArticles);
  setLeanLeftArticles(leanLeftArticles);
  setCenterArticles(centerArticles);
  setLeanRightArticles(leanRightArticles);
  setRightWingArticles(rightWingArticles);
};

  const formatDate = date => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSearchButtonClick = () => {
    fetchCombinedArticles();
    setLoaded(true)
    //generateSummary();
  };
  const maxTitle=(article)=>{
    const maxLength = Math.max(...article.map(obj => obj.title.length));

    // Pad the titles of the objects with spaces to match the length of the longest title
    article.forEach(obj => {
      const titleLengthDiff = maxLength - obj.title.length;
      obj.title = obj.title + "\u00A0".repeat(titleLengthDiff);
   
     
    });
  }
  const ShowData=()=>{
    maxTitle(LeftWingArticles)
    maxTitle(LeanLeftArticles)
    maxTitle(CenterArticles)
    maxTitle(LeanRightArticles)
    maxTitle(RightWingArticles)
    console.log(LeftWingArticles)
    
 
    setLeftWingArticles(LeftWingArticles);
  setLeanLeftArticles(LeanLeftArticles);
  setCenterArticles(CenterArticles);
  setLeanRightArticles(LeanRightArticles);
  setRightWingArticles(RightWingArticles);
  console.log(loaded)
  setLoaded(true)
  }

  return (
    <React.Fragment>
      <Navbar/>
          <div className={loaded==true?"mainPage":"mainPage catch"}>
            <section>
         {!loaded&&
         <div className='p-catchphrase'>
         <p className='catchphrase'>
              <strong className='S'>S</strong>EE ANY NEWS ARTICLE AT ANY POINT IN HISTORY OF <strong className='red'>
                OF THE INTERNET
              </strong>
            </p>
            </div>}
    
     <div className='searchDiv'>
    <div className='search'>
     <i class="fa-solid fa-magnifying-glass"></i> <input
        type="text"
        placeholder="Type Key Word"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
     
    </div>
  <div className='button' onClick={handleSearchButtonClick}>Search</div></div>
    <div>
    <NewsCategory articles={leftWingArticles} category="Left Wing" />
    <NewsCategory articles={leanLeftArticles} category="Lean Left" />
    <NewsCategory articles={centerArticles} category="Center" />
    <NewsCategory articles={leanRightArticles} category="Lean Right" />
    <NewsCategory articles={rightWingArticles} category="Right Wing" />
    </div>
    </section>
  </div>
    </React.Fragment>

  );
};

export default App;
