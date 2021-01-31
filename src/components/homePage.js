import React, { useState, useEffect, useContext } from 'react';
import Title from './title';
import Search from'./search';
import Modal from './modal';
import { UserContext } from '../providers/userProvider';
import { auth } from '../firebase/config';
import '../index.css';
import { useMediaQuery } from 'react-responsive'
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';



// const url= 'https://pixabay.com/api/'
const url = 'https://api.unsplash.com/' //UNSPLASH


function HomePage({ darkModeToggle, theme }) {

  const user = useContext(UserContext);
  // console.log(user)
  const { photoURL, displayName, email } = user;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })


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
           <img className="content-image" src={image.urls.regular}/>
           <div class="content-details fadeIn-bottom">
            {/* <h3 class="content-title">This is a title</h3> */}
            <p class="content-text">Photo by {image.user.name} on Unsplash</p>
          </div>
         </a>
      </div>
    )
  }

  const download = async (id) => {
    console.log('hello')
    let url = "https://api.unsplash.com/photos/?client_id="+process.env.REACT_APP_UNSPLASH_API_KEY+"&"+id+"/download"
    let res = await fetch(url)
    let response = await res.json()
    console.log(response)
};

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
        
       { isDesktopOrLaptop && <> <div className="card-columns">
          {images.map((image, index) => (
            <a href={image.links.html} target="_blank">
              <figure class="figure">
              {/* <img src={image.urls.regular} class="figure-img img-fluid rounded" alt="..."/> */}
              <Image image={image}/>
              {image.tags && <figcaption class="figure-caption d-flex flex-row justify-content-center flex-wrap mt-1">
                {image.tags.map((tag) => (
                  <span className='tag px-3 py-1 mr-2 rounded-pill'>#{tag.title}</span>
                ))}
              </figcaption>}
            </figure>
            </a>
          ))}
          </div> </>}

          {isTabletOrMobileDevice && <><div className="card-columns">
          {images.map((image, index) => (
            <a href={image.links.html} target="_blank">
              {theme === "light" && <><div className="card cardTheme">
              <img src={image.urls.small} className="card-img-top" onClick={() => setSelectedImg(image.urls.regular)}/>
                        <div class="card-body">
                            <div className="action">
                            {/* <IconButton style={{color:'#f50057', fontSize:'18px'}} onClick={() => {}}>
                                <FavoriteIcon/>
                            </IconButton> */}
                             {/* <IconButton size="medium" style={{color:'#444', fontSize:'18px', border:'0.7px solid #444'}} onClick={() => {}}>
                                  <FavoriteBorderIcon/>
                              </IconButton> */}
                                        {/* <a href={image.links.download+ "?force=true"} className="btn btn-sm btn-light border-0 rounded-lg" onClick={() => download(image.id)}>
                                            <i className="fas fa-arrow-down custom-icon" style={{color:"#689f38"}}></i> 
                                        </a> */}
                            {/* <Button size="small" style={{color:'#444', fontWeight:'600', border:'0.7px solid #444'}}>
                                DOWNLOAD
                            </Button> */}
                          
                                </div>
                                <div className="photo-header mt-1 mb-1">Photo by <a href={image.user.links.html}>{image.user.name}</a> on <a href="https://unsplash.com/">Unsplash</a></div>
                                {/* {item.description && <p class="card-text">{item.description}</p>} */}
                                <div className="tags mt-2" style={{display:'flex', flexWrap:'wrap'}}>
                                    {image.tags.map((tag) => (
                                        <span className='tag px-3 py-1 mr-2 rounded-pill'>#{tag.title}</span>
                                    ))}
                                </div>
                        </div>
              </div></>}
              
              {theme === "dark" && <><div className="card rounded cardTheme">
              <img src={image.urls.small} className="card-img-top" onClick={() => setSelectedImg(image.urls.regular)}/>
                        <div class="card-body">
                            <div className="action">
                                    
                              {/* <IconButton style={{color:'#f50057', fontSize:'18px'}} onClick={() => {}}>
                                  <FavoriteIcon/>
                              </IconButton> */}

                              {/* <IconButton size="medium" style={{color:'#fff', fontSize:'18px', border:'0.7px solid #fff'}} onClick={() => {}}>
                                  <FavoriteBorderIcon/>
                              </IconButton> */}
                                        {/* <a href={image.links.download+ "?force=true"} className="btn btn-sm btn-light border-0 rounded-lg" onClick={() => download(image.id)}>
                                            <i className="fas fa-arrow-down custom-icon" style={{color:"#689f38"}}></i> 
                                        </a> */}
                              {/* <Button size="small" style={{color:'#fff', fontWeight:'600', border:'0.7px solid #fff'}}>
                                DOWNLOAD
                              </Button> */}
                                </div>
                                <div className="photo-header mt-1 mb-1">Photo by <a href={image.user.links.html}>{image.user.name}</a> on <a href="https://unsplash.com/">Unsplash</a></div>
                                {/* {item.description && <p class="card-text">{item.description}</p>} */}
                                <div className="tags mt-2" style={{display:'flex', flexWrap:'wrap'}}>
                                    {image.tags.map((tag) => (
                                        <span className='tag px-3 py-1 mr-2 rounded-pill'>#{tag.title}</span>
                                    ))}
                                </div>
                        </div>
              </div></>}
              
            </a>
          ))}
          </div></>}
        
      </div>
      </InfiniteScroll>
      {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg = {setSelectedImg}/>}
    </div>
  );
}

export default HomePage;
