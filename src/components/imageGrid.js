import React from 'react';
import useFireStore from '../hooks/useFirestore';

const ImageGrid = ({ setSelectedImg }) => {
    const {docs} = useFireStore('images')
    console.log(docs)

    return(
        <div className="hide-mobile image-grid">
            {docs && docs.map(doc => (
                <div key={doc.id} className="img-wrap"
                    onClick={() => setSelectedImg(doc.url)}>
                 <img src={doc.url} key={doc.id} alt=""/>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;