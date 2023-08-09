import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Posts from './components/Posts'
import Post from './components/Post'
import Services from './components/Services'
import Contact from './components/Contact'
import Works from './components/Works'




function App() {
  
  const restBase = 'https://massas.sg-host.com/mindeset/wp-json/wp/v2/';

  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
        ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
        ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }

  return (
      <Router basename="/wp-react">
        <header id="masthead" className="site-header">
          <div className="site-branding">
            <p className="site-title">Headless WordPress App</p>
          </div>
          <nav className="site-navigation">
            <ul>
              <li><NavLink to='/' end>Home</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/blog'>Blog</NavLink></li>
              <li> <NavLink to="/works">Works</NavLink> </li>
              <li><NavLink to='/services'>Services</NavLink></li>
              <li> <NavLink to="/contact">Contact</NavLink> </li>
            </ul>
          </nav>
        </header>
        <main id="main">
          <Routes>
            <Route path='/' element={<Home restBase={restBase} />} />
            <Route path='/about' element={<About restBase={restBase} />} />
            <Route path='/works' element={<Works restBase={restBase} featuredImage={featuredImage} />} />
            <Route path='/blog' element={<Posts restBase={restBase} featuredImage={featuredImage} />} />
            <Route path='/blog/:slug' element={<Post restBase={restBase} />} />
            <Route path='/services' element={<Services restBase={restBase} />} />
            <Route path='/contact' element={ <Contact restBase={restBase} />} />
            <Route path='/blog/:slug' element={ <Post restBase={restBase} featuredImage={featuredImage} />} />
          </Routes>
        </main>
        <footer>
				  <p className="copyright">Created by <a href="https://wp.bcitwebdeveloper.ca/" target="_blank" rel="noopener noreferrer">Jonathon Leathers</a>.</p>
        </footer>
      </Router>
  );
}

export default App;


