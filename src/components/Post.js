import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Post = ( {restBase} ) => {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed`;
    // const [restData, setData] = useState([]);
    const [restData, setData] = useState(null);

    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                console.log(data);
                setData(data[0]);
                setLoadStatus(true);
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
        { isLoaded ?
            <>
                <article id={`post-${restData?.id}`}>
                    <h1>{restData?.title?.rendered}</h1>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html: restData?.content?.rendered}}></div>
                </article>

                <nav className="posts-navigation">
                    {restData?.previous_post?.id &&
                        <Link to={`/blog/${restData.previous_post.slug}`} className="prev-post">Previous: {restData.previous_post.title}</Link>
                    }
                    {restData?.next_post?.id &&
                        <Link to={`/blog/${restData.next_post.slug}`} className="next-post">Next: {restData.next_post.title}</Link>
                    }
                </nav>

            </>
        : 
            <Loading />
        }
        </>
    )

}

export default Post
