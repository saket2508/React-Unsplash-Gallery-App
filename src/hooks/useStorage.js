import React, {useState, useEffect } from 'react';
import { projectStorage, projectFireStore, timestamp } from '../firebase/config';


const useStorage = (file) => {
    const [ progress, setProgress ] = useState(0);
    const [ error, setError ] = useState(null);
    const [ url, setUrl ] = useState(null);

    useEffect(() => {
        //creates a file reference
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFireStore.collection('images');


        //adds the file to that location
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL()
            const createdAt = timestamp()
            collectionRef.add({url,createdAt})
            setUrl(url)
        })
    }, [file])

    return { progress, url, error }
}


export default useStorage;