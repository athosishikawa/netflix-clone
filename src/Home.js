//Componente Inicial
import { useEffect } from 'react';
import './Home.css';
import React, { useState } from 'react';
import {getData} from './api';

export default function Home() {
    const [tvs, setTVs] = useState([])


    useEffect(()=>{

        getData().then((data)=>{
            console.log(data)
            setTVs(data.results || [])
        })

    },[])

    let showTvs = () => {
        let html = []

        tvs?.genres.forEach(element => {
            html.push(<p key={element.id} className = 'tvs'> 
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