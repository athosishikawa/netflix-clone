import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Nav.css'
// import testar from Login;
import Login from '../Login';

function Nav () {
    const [userName, setUserName] = useState('');



    useEffect(() => {
        // Chama a função testar para obter o nome do usuário
        axios.get("http://localhost:8080/test", {
            headers: {
                'Authorization': sessionStorage.getItem("sessionID")
              }
        })
        .then(resp => {
          console.log("RESPOSTA: ", resp.data);
          setUserName(resp.data.nome);  // Define o nome do usuário no estado
        })
        .catch(error => {
          console.log(error);
        });
      }, []);

    const logo = "https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png"
    const avatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"

    return (
        <div className="nav-container">
            <img className="nav-logo" src={logo} alt="NetFlix"></img>
            <div className="nav-user">
                <img className="nav-avatar" src={avatar} alt="Avatar" />
                <span className="nav-username">{userName}</span> {/* Exibe o nome do usuário */}
            </div>
        </div>
    )

}

export default Nav;