import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Works = ({ restBase, featuredImage }) => {
  const restPathWeb = restBase + 'fwd-work?_embed&orderby=title&order=asc&work_category=web';
  const restPathPhoto = restBase + 'fwd-work?_embed&orderby=title&order=asc&work_category=photo';
  const [webData, setWebData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseWeb = await fetch(restPathWeb);
        const responsePhoto = await fetch(restPathPhoto);

        if (responseWeb.ok && responsePhoto.ok) {
          const webPosts = await responseWeb.json();
          const photoPosts = await responsePhoto.json();
          setWebData(webPosts);
          setPhotoData(photoPosts);
          setLoadStatus(true);
        } else {
          throw new Error(
            `HTTP error! status: ${responseWeb.status}, ${responsePhoto.status}`
          );
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        console.error(error.stack);
        setLoadStatus(false);
      }
    };

    fetchData();
  }, [restPathWeb, restPathPhoto]);

  return (
    <>
      {isLoaded ? (
        <>
          <h1>Works</h1>
          <section className="page-work-web">
            <h2>Web</h2>
            {Array.isArray(webData) &&
              webData.map((post) => (
                <article key={post.id} id={`post-${post.id}`}>
                  {post.featured_media !== 0 &&
                    post._embedded["wp:featuredmedia"] &&
                    post._embedded["wp:featuredmedia"][0] && (
                      <figure
                        className="featured-image"
                        dangerouslySetInnerHTML={featuredImage(
                          post._embedded["wp:featuredmedia"][0]
                        )}
                      ></figure>
                    )}
                  <Link to={`/works/${post.slug}`}>
                    <h2>{post.title.rendered}</h2>
                  </Link>
                  <div className="work-category">{post.work_category}</div>
                  <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  ></div>
                </article>
              ))}
          </section>
          <section className="page-work-photo">
            <h2>Photo</h2>
            {Array.isArray(photoData) &&
              photoData.map((post) => (
                <article key={post.id} id={`post-${post.id}`}>
                  {post.featured_media !== 0 &&
                    post._embedded["wp:featuredmedia"] &&
                    post._embedded["wp:featuredmedia"][0] && (
                      <figure
                        className="featured-image"
                        dangerouslySetInnerHTML={featuredImage(
                          post._embedded["wp:featuredmedia"][0]
                        )}
                      ></figure>
                    )}
                  <Link to={`/works/${post.slug}`}>
                    <h2>{post.title.rendered}</h2>
                  </Link>
                  <div className="work-category">{post.work_category}</div>
                  <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  ></div>
                </article>
              ))}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Works;







// ACF featured_works
// const restPathPage = restBase + 'pages?slug=works';
