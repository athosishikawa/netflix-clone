//Componente Inicial
import { useEffect } from 'react';
import './Home.css';
import React, { useState } from 'react';

export default function Home() {
    const [tvs, setTVs] = useState()

    let getData = async () => {
        let API_KEY = 'b83c004f5b194bb6a5da970cbd8c71da'
        let URI = 'https://api.themoviedb.org/3/genre/tv/list?api_key='+API_KEY

        let data = await fetch(URI)

        let result = data.json()

        return result
    }

    useEffect(()=>{

        getData().then((data)=>{
            console.log(data)
            setTVs(data)
        })

    },[])

    let showTvs = () => {
        let html = []

        tvs?.genres.forEach(element => {
            html.push(<p key={element.id}> 
                        <p> <label>Id:</label> {element.id}</p>
                        <p> <label>Name:</label> {element.name}</p>
                      </p>
                     )
        });

        return html
    }

    return (
        <div>

            {/*Navegar*/}
            {/*Conteudo*/}
            {/*Rodapé*/}

            <h1>NETFLIX</h1>

            {showTvs()}
            

        </div>
    )
}