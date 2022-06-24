import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // package for data formatting

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('coding');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const loadData = async () => {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${query}&token=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles);
      // console.log(data.articles);
    };
    loadData();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('input is empty');
    } else {
      setQuery(text);
      setText('');
    }
  };

  return (
    <>
      <header>
        <h1>News Digest</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='search'
            placeholder='search here'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Search</button>
        </form>
      </header>
      <main>
        {isLoading ? (
          <div className='spinner'></div>
        ) : (
          <>
            <p className='subject'>
              Your query: <span>{query}</span>
            </p>

            <section className='results'>
              <article className='card'>
                {articles.map(
                  ({
                    title,
                    description,
                    content,
                    url,
                    image,
                    publishedAt,
                    source,
                  }) => (
                    <div key={url}>
                      <h2>{title}</h2>
                      <div className='results__image-section'>
                        <img className='image' src={image} alt='' />
                        <ul className='results__image-section__list'>
                          <li className='gray'>
                            Date:{' '}
                            {format(new Date(publishedAt), 'dd MMMM yyyy')}
                          </li>
                          <li className='gray'>
                            Source:{' '}
                            <a
                              className='gray'
                              href={source.url}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {source.name}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p className='description'>{description}</p>
                      <p className='content'>{content}</p>
                      <ul className='gray'>
                        <li>
                          <a
                            className='gray '
                            href={url}
                            target='_blank'
                            rel='noreferrer'
                          >
                            Read More
                          </a>
                        </li>
                      </ul>
                    </div>
                  )
                )}
              </article>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;
