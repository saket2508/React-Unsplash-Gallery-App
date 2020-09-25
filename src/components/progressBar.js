import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile }) => {

    const {url, progress} = useStorage(file)
    console.log(progress, url)


    useEffect(() => {
        if(url){
            setFile(null)
        }
    }, [url, setFile])

    return(
       <div style={{width:'50%', margin:'10px auto'}}>
           <div className="progress-bar" style={{width: progress + "%"}}>
            </div>
       </div>

    )
}

export default ProgressBar;