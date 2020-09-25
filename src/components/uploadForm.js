import React, { useState, useEffect } from 'react';
import ProgressBar from './progressBar';


const UploadForm = ({ props }) => {

    const [ file, setFile ] = useState(null)
    const [ error, setError ] = useState(null)
    const types = ["image/png", "image/jpeg", "image/gif"]

    const changeHandler = (e) => {

        console.log("Changed.")
        let selected = e.target.files[0]

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError("")
        }
        else{
            setFile(null);
            setError("Please select an image file (png or jpeg)");
        }

    }

    return(
        <form>
            <label>
                <input type = "file" onChange = {changeHandler}/>
                <span>+</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        </form>
    )
}


export default UploadForm;