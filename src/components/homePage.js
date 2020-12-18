import React, { useState, useEffect, useContext } from 'react';
import Title from './title';
import Search from'./search';
import UploadForm from './uploadForm'; 
import ImageGrid from './imageGrid';
import Modal from './modal';
import GridImages from './grid';
import { UserContext } from '../providers/userProvider';
import { auth } from '../firebase/config';
import '../index.css';
import { setLogLevel } from 'firebase';
import { FlashOffTwoTone } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';


// const url= 'https://pixabay.com/api/'
const url = 'https://api.unsplash.com/' //UNSPLASH


function HomePage({ darkModeToggle, theme }) {

  const user = useContext(UserContext);
  // console.log(user)
  const { photoURL, displayName, email } = user;

  // const key = "19529048-a0442e53b19277dfa094f6e1f"
  const key = "1lBCHcgi0-khQZwmixmCYbz6eB0YI4hC6Nhfvw6UDkI";

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [term, setTerm] = useState('')

  const fetchImages = () => {
    setPage(page+1)
    if(term === ''){
      setLoading(true)
      fetch(`${url}/search/photos?client_id=${key}&query=Cats&page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setImages(images.concat(data.results))
        setLoading(false)
      })
    }
    else{
      setLoading(true)
      fetch(`${url}search/photos?client_id=${key}&query=${term}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setImages(images.concat(data.results))
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${url}/search/photos?client_id=${key}&query=Cats`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // let copy = createCopy(data.results)
        setImages(data.results)
        setLoading(false)
      })
      .then(err => {
        console.log(err)
        //setError(true)
        setLoading(false)
      })
  }, [])

  const search = async() => {
    setPage(1)
    try{
      setLoading(true)
      let res = await fetch(`${url}/search/photos?client_id=${key}&query=${term}`)
      let data = await res.json()
      console.log(data)
      setImages(data.results)
      setLoading(false)
    }
    catch(error){
      // setError(true)
      console.log(error)
      setLoading(false)
    }

  }

  // const createCopy = (data) =>{
  //   return data.map((item) => ({
  //     ...item,
  //     selected: false       
  // }));
  // }

  const Image = ({image})  => {
    return(
      <div className="content">
         <a href={image.links.html} target="_blank">
           <div className="content-overlay"></div>
           <img className="content-image figure-img img-fluid rounded" src={image.urls.regular}/>
           <div class="content-details fadeIn-bottom">
            {/* <h3 class="content-title">This is a title</h3> */}
            <p class="content-text">Photo by {image.user.name} on Unsplash</p>
          </div>
         </a>
      </div>
    )
  }

  return (
    <div className="app">
      <Title userName = {displayName} auth={auth} darkModeToggle = {darkModeToggle} theme={theme}/>
      <Search props={{
        term: term,
        search: search,
        setTerm: setTerm
      }}/>
      {error && <div className="error">Error trying to load images</div>}
      {/* {images && <GridImages photos={images} setSelectedImg = {setSelectedImg}/>} */}
      
        <InfiniteScroll
        dataLength = {images.length}
        next = {fetchImages}
        hasMore = {true}
        loader = {
          <div></div>
        }
        >
          <div className="container-fluid mt-4" style={{overflow:'auto'}}>
        <div className="card-columns">
          {images.map((image, index) => (
            // <div key={index} className="card border-0">
            //   <img className="card-img-top" src={image.largeImageURL}/>
            // </div>
            <a href={image.links.html} target="_blank">
              <figure class="figure">
              <img src={image.urls.regular} class="figure-img img-fluid rounded" alt="..."/>
              {/* <Image image={image}/> */}
              {image.tags && <figcaption class="figure-caption d-flex flex-row justify-content-center flex-wrap">
                {image.tags.map((tag) => (
                  <span className='tag px-3 py-1 mr-2 rounded-pill'>#{tag.title}</span>
                ))}
              </figcaption>}
            </figure>
            </a>
          ))}
          </div>
      </div>
      </InfiniteScroll>
      {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg = {setSelectedImg}/>}
    </div>
  );
}

export default HomePage;
