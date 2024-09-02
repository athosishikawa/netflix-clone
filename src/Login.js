import './login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [response, setResponse] = useState(0);
  const [email, setEmail] = useState(0);
  const [senha, setSenha] = useState(0);
  const navigate = useNavigate();

  const logo = "https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png"


  let onChangeEmail = (e) => {
    setEmail(e.target.value)
    console.log(email)
  }

  let onChangeSenha = (e) => {
    setSenha(e.target.value)
    console.log(senha)
  }

  let logar = () => {
    axios.post("http://localhost:8080/login", 
    {
        "email": email,
        "senha": senha
    
    }
  ).then(resp => {
    //gravando na sessão do cliente local (no frontend)
    console.log(resp)
    sessionStorage.setItem("sessionID", resp?.data?.sessionID)

    }).catch(error => {    
        console.log(error)
    });
  } 

  let entrar = () => {
    axios.post("http://localhost:8080/login", 
    {
        "email": email,
        "senha": senha
    
    }
  ).then(resp => {
    
    
    if(resp?.data?.sessionID){
      sessionStorage.setItem("sessionID", resp.data.sessionID)
      
      //redireciona o navegador para a home no netflix
      navigate('home');

    }


    }).catch(error => {    
        console.log(error)
    });
  } 

  let testar = () => {
    axios.get("http://localhost:8080/test", 
    {
      headers: {
        'Authorization': sessionStorage.getItem("sessionID")
      }
    }
    ).then(resp => {
     
      setResponse(resp)
      console.log(resp.data)

    }).catch(function (error) {    
        console.log(error)
    });

  }

  return (
    <div className="App">
      
      <header className="nav-container">
        <img className="nav-logo" src={logo} alt="NetFlix"></img>
        
      </header>

      <div className="App-header">
          <h1>Entrar</h1>
          <input onChange={onChangeEmail} placeholder="Email ou número de Celular" ></input>
          <input type = "password" onChange={onChangeSenha} placeholder="Senha" ></input>

          {/* <button onClick={logar}>Logar</button>

          <button onClick={testar}>Testar</button> */}

          <button onClick={entrar}>Entrar</button>

          <a href = "https://www.netflix.com/br/LoginHelp">Esqueceu a senha?</a>

          <div className='checkboxContainer'>
            <input type='checkbox'></input>
            <label htmlFor='checkbox'>Lembre-se de mim</label>
          </div>


          <p>Novo por aqui? <a href = "https://www.netflix.com/br/">Assine agora.</a>
          </p>

          <div className='captcha'>Essa página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. Saiba mais</div>
          

          {/* { response?.data } */}
      
      </div>
    </div>
  );
}

export default Login;
