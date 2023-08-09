import { useState, useEffect } from "react";
import Loading from "./Loading";


// slug: contact
// id: 9

const Contact = ( {restBase} ) => {

  const restPath = restBase + 'pages?slug=contact';
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch(restPath)
      if ( response.ok ) {
        const data = await response.json()
        setData( data[0] )
        setLoadStatus( true )
      } else {
        setLoadStatus(false)
      }
    }
    fetchData()
  }, [restPath] )

  return (
    <>
      {isLoaded?
        <article>
          <h1> {restData.title.rendered} </h1>
          <div dangerouslySetInnerHTML={ {__html:restData.acf.address} }></div>
          <div>{restData.acf.email}</div>
        </article>
        :
        <Loading />
       }
    </>
  )
}

export default Contact
