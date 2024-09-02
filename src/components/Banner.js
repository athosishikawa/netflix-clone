import React, {useEffect, useState} from 'react'
import './Banner.css'
import axios from 'axios'
import {getCategories, getDataAll } from '../api';

function Banner() {
    const [movie, setMovie] = useState({});
    const [userAge, setUserAge] = useState(null);



    const fetchRandomMovie = async () => {
        try{

            const categories = await getCategories();

            const netflixOriginalsCategory = Array.isArray(categories) && categories.find( 
                (category) => category.name === "netflixOriginals"
            )

            // Chamar o backend passando o path como query string
            const data = await getDataAll(netflixOriginalsCategory) 


            const movies = data?.results;
            const randomIndex = Math.floor(Math.random() * movies.length);


            fetchIdade()
            console.log("IDADE: ", userAge)


            if (!movies[randomIndex].adult){
                setMovie(movies[randomIndex]);
                console.log("NOME: ", movies[randomIndex].title)
                console.log("ADULTO: ", movies[randomIndex].adult)

            }
            if (movies[randomIndex].adult && userAge >= 18){
                setMovie(movies[randomIndex]);
            }
            

        }catch (error) {
            console.log("Deu ruim no Banner.js", error)
        }
    }

    const fetchIdade = async () => {
        try{
            const userResponse = await axios.get("http://localhost:8080/test", {
                headers: {
                    'Authorization': sessionStorage.getItem("sessionID")
                }
            });
            setUserAge(userResponse.data.idade);  // Atualiza o estado com a idade do usuário
    
        }catch (error) {
            console.log(error)
        }
    }


    useEffect( () => {

        fetchRandomMovie()

    }, [] );


    let truncate = (str, n) => {
        return str?.length > n ? str?.substr(0, n-1) + '...' : str;
    }

    return (
        <header
            className='banner-container'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                roundPosition: "center-center",
            }}
        >
            <div className='banner-content'>
                <h1 className='banner-title'>
                    { movie?.title || movie?.name || movie?.original_name }
                </h1>
                <div className='banner-button-container'>
                    <div className='banner-button'>
                        Assistir
                    </div>
                    <div className='banner-button'>
                        Minha Lista
                    </div> 
                </div>
               
                <div className='banner-description'>
                    <h2> {truncate(movie?.overview, 100 )} </h2>
                </div>

            </div>

        </header>
    )
}

export default Banner;