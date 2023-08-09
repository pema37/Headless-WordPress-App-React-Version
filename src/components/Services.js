import React, { useState, useEffect } from 'react';
import Loading from './Loading';

// slug: services
// id: 13
// ACF: service_text


const Services = ({ restBase }) => {
  const restPathPage = restBase + 'pages?slug=services';
  const restPathPosts = restBase + 'fwd-service?_embed&orderby=title&order=asc';

  const [restDataPage, setDataPage] = useState([]);
  const [restDataPosts, setDataPosts] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePage = await fetch(restPathPage);

        if (!responsePage.ok) {
          throw new Error(`HTTP error! Status: ${responsePage.status}`);
        }

        const dataPage = await responsePage.json();
        console.log('Page Data:', dataPage);

        setDataPage(dataPage[0]);
        setLoadStatus(true);
      } catch (error) {
        console.error('Fetch failed:', error);
        console.error(error.stack);
        setLoadStatus(false);
      }
    };

    fetchData();
  }, [restPathPage]);

  useEffect(() => {
    const fetchDataPosts = async () => {
      try {
        const responsePosts = await fetch(restPathPosts);

        if (!responsePosts.ok) {
          throw new Error(`HTTP error! Status: ${responsePosts.status}`);
        }

        const dataPosts = await responsePosts.json();
        console.log('Posts Data:', dataPosts);

        setDataPosts(dataPosts);
      } catch (error) {
        console.error('Fetch failed:', error);
        console.error(error.stack);
      }
    };

    fetchDataPosts();
  }, [restPathPosts]);

  return (
    <>
      {isLoaded ? (
        <article id={`post-${restDataPage.id}`}>
          <h1>{restDataPage.title.rendered}</h1>
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: restDataPage.content.rendered }}
          ></div>
          {restDataPosts.length > 0 ? (
            <>
              <h2>Service Posts</h2>
              {restDataPosts.map((post) => (
                <article key={post.id} id={`post-${post.id}`}>
                  <h3>{post.title.rendered}</h3>
                  <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  ></div>
                  <p>Service Text: {post.acf.service_text}</p>
                </article>
              ))}
            </>
          ) : (
            <p>No service posts found.</p>
          )}
        </article>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Services;


















