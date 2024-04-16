import  { useEffect, useState } from 'react';

import './home.css'



export function Home() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://pexelsdimasv1.p.rapidapi.com/v1/curated?per_page=15&page=1';
            const options = {
                method: 'GET',
                headers: {
                    Authorization: 'OpnzOZ5HAoERAT63nvdF64EMddqccZvmekB7eLQiBmQP7OG5vu3ifehl',
                    'X-RapidAPI-Key': '2c84f14307msh53a0198aeab41c3p177471jsn0d1ef02757c1',
                    'X-RapidAPI-Host': 'pexelsdimasv1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setPhotos(data.photos);
                console.log(data.photos)

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
       <section className="home">
        <div className="home-container"> 
           <div className="container-photo">   
           <div className="photo-list">
                {photos.map(photo => (
                    <div className='photos' key={photo.id}>
                        <a href={photo.url} target='_blank'>
                            <img src={photo.src.medium} alt={photo.photographer} />
                        </a>
                    </div>
                ))}
                </div>
                </div>
            </div>
       </section>
   );
}
