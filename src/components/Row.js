import { useEffect } from 'react'
import './Row.css'
import {getDataAll} from '../api'
import { useState } from 'react'
import axios from 'axios'


export default function Row({title, path, isLarge}) {
    const[filmes, setFilmes] = useState([])
    const [userAge, setUserAge] = useState(null);

    let imageHost = 'https://image.tmdb.org/t/p/original/'
    

    let fetchData = async () => {

        let result = await getDataAll(path)

        return result
    }

    useEffect(() => {
        const fetchMovies = async () => {
            let consulta = await fetchData();
            
            if (consulta && consulta.results) {
                const movies = consulta.results;
    
                // Filtrar os filmes conforme a idade do usuário
                const filteredMovies = movies.filter(movie => !movie.adult || (movie.adult && userAge >= 18));
    
                // Se houver filmes filtrados, definir o estado
                if (filteredMovies.length > 0) {
                    setFilmes(filteredMovies);
                    console.log("FILMES: ", filteredMovies);
                } else {
                    console.log("Nenhum filme adequado foi encontrado.");
                }
            }
        };
    
        fetchMovies();
        fetchIdade();
    }, [userAge]); 
    
    

    
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

    return (
        <div className='row-container'>

            <h2 className='row-header'>{title}</h2>

            <div className='row-cards'>
                {filmes?.map( (filme) => {
                    
                    return (
                        <img
                        className={`movie-card ${isLarge && "movie-card-large"}` }
                        key={filme.id} 
                        src={imageHost + (isLarge?filme.backdrop_path:filme.poster_path)} 
                        alt={filme.name} >
                        </img>
                    )                
                })}
            </div>
        </div>
    )
}