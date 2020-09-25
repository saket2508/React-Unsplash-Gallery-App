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

const url= 'https://api.unsplash.com/'


function HomePage() {

  const user = useContext(UserContext);
  // console.log(user)
  const { photoURL, displayName, email } = user;


  const [selectedImg, setSelectedImg] = useState(null)
  const [error, setError] = useState(false)
  const [images, setImages] = useState(null)
  const [term, setTerm] = useState('')

  useEffect(() => {
    fetch(`${url}/search/photos/?query=Canada&per_page=30&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let copy = createCopy(data.results)
        setImages(copy)
      })
      .then(err => {
        console.log(err)
        //setError(true)
      })
  }, [])

  const search = async() => {
    try{
      let res = await fetch(`${url}/search/photos/?query=${term}&per_page=30&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      let data = await res.json()
      console.log(data)
      setImages(data.results)
    }
    catch(error){
      setError(true)
      console.log(error)
    }

  }

  const createCopy = (data) =>{
    return data.map((item) => ({
      ...item,
      selected: false       
  }));
  }

  return (
    <div className="app">
      <Title userName = {displayName} auth={auth}/>
      <Search props={{
        term: term,
        search: search,
        setTerm: setTerm
      }}/>
      {error && <div className="error">Error trying to load images</div>}
      {images && <GridImages photos={images} setSelectedImg = {setSelectedImg}/>}
      {/* <UploadForm/>
      <ImageGrid setSelectedImg = {setSelectedImg}/> */}
      {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg = {setSelectedImg}/>}
    </div>
  );
}

export default HomePage;
