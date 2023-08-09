import { useState, useEffect } from 'react'
import Loading from './Loading'


// slug: home
// id: 5

// left_section_heading
// left_section_content

// right_section_heading
// right_section_content

const Home = ( {restBase} ) => {
    const restPath = restBase + 'pages?slug=home'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data[0]) 
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
        { isLoaded ?
            <article>
                <h1>{restData.title.rendered}</h1>
                <section>
                    <h2>{restData.acf.left_section_heading}</h2>
                    <p>{restData.acf.left_section_content}</p>
                </section>
                <section>
                    <h2>{restData.acf.right_section_heading}</h2>
                    <p>{restData.acf.right_section_content}</p>
                </section>
            </article>
        : 
            <Loading />
        }
        </>   
    )
}

export default Home




