import { Avatar, Box, Button, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import React, { useEffect } from 'react';
import history from "../../lib/utils/history.js";
import { useNavigate } from 'react-router-dom';
import './css/main.css'; 
import './css/fontawesome-all.min.css'; 
import './css/noscript.css'; 
import './css/animate.css';  
import logo4 from './img/logo4.png'; 
import votodibujo1 from './img/votodibujo1.png'; 
import votodibujo2 from './img/votodibujo2.png'; 
import votodibujo3 from './img/votodibujo3.png'; 
import votodibujo4 from './img/votodibujo4.png'; 
import votodibujo5 from './img/votodibujo5.png'; 
import { useAuth0 } from "@auth0/auth0-react";
import loginbg from './img/login_bg.png'; 

const Landing = (props) => {
    const { loginWithRedirect } = useAuth0();
    const onJugar = () => loginWithRedirect({ appState: { returnTo: "/votacion", } });

    //Animación de las imagenes
    useEffect(() => {
        const handleScroll = () => {
            const elementos = document.querySelectorAll('.item');
            elementos.forEach((elemento) => {
                const rect = elemento.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    elemento.classList.add('animated');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id="wrapper" className="divided">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&display=swap" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
		<link rel="shortcut icon" href="img/logo3.png" type="image/x-icon" />
            <section className="wrapper style1 align-left"> 
                <div className="inner row">
                    <div className="col-6 left-aligned" style={{padding:0}}>
                        <a href="#">
                            <img src={logo4} alt="logo"  height="80" />
                        </a>
                    </div>
                    <div className='col-6'>
                        <ul className="icons right-aligned" style={{marginTop:15}}>
                            <li><a href="#" className="icon style2 fa-user fa-solid content-align-right"><span className="label">User</span></a></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="fadeIn spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in">
                <div className="content back-in-left">
                    <p className="major" style={{}}>¿Quién tiene la posta?</p>
                    
                    <h1 className='bold'>¡Hacé tu pronóstico electoral y compará con el sentir nacional!</h1>
                    <ul className="actions stacked">
                        <li><a  onClick={onJugar} className="button big wide smooth-scroll-middle bold mainbtn">Jugar</a></li>
                    </ul>
                </div>
                <div className="  image">
                    <img src={votodibujo1} alt="votodibujo1" />
                </div>
            </section>
    
            <section className="bgsection section-mt fadeIn spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
                <div className="content back-in-right">
                    <h2 className='bold' >¿Cómo funciona Prodix?</h2>
                    <ul className="actions stacked">
                        <li><p><span className='subtitle'>1. Registrate o Iniciá sesión</span> <br /> Abrí la aplicación e iniciá sesión con tu cuenta si ya tienes una, o registrate si sos un nuevo usuario.</p></li>
                        <li><p><span className='subtitle'>2. Hacé tu pronóstico</span> <br /> Seleccioná tu predicción de cantidad de votos para cada candidato. Podés hacerlo de manera anónima o con tu perfil registrado.</p></li>
                        <li><p><span className='subtitle'>3. Explorá las estadísticas</span> <br /> Guardá tu predicción y mirá las predicciones de otros usuarios. Esto te dará una idea del sentimiento popular.</p></li>
                        <li><p><span className='subtitle'>4. Compartí y participá por un premio</span> <br /> Continuá utilizando la aplicación para hacer seguimiento de las tendencias electorales y participar activamente en estas elecciones.</p></li>
                       
                    </ul>
                     <ul className="actions stacked">
                        <li><a href="#" onClick={onJugar}  className="mainbtn button bold wide">Jugar</a></li>
                    </ul>
                </div>
                <div className="image  ">
                    <img src={votodibujo2} alt="" />
                </div>
            </section>

            <section className="section-mt fadeIn spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in">
                <div className="content back-in-left">
                    <h2 className='bold' >¿Cuál es el objetivo de Prodix?</h2>
                    <ul className="actions stacked">
                        <li><i className="fas fa-lg fa-check check-color"></i>Fomentar la participación cívica</li>
                        <li><i className="fas fa-lg fa-check check-color"></i>Facilitar la toma de decisiones informadas</li>
                        <li><i className="fas fa-lg fa-check check-color"></i>Promover la discusión saludable</li>
                        <li><i className="fas fa-lg fa-check check-color"></i>Evaluar el sentimiento popular</li>
                        <li><i className="fas fa-lg fa-check check-color"></i>Revalorizar el interés en la democracia</li>
                    </ul>
                    <ul className="actions stacked">
                        <li><a href="#" onClick={onJugar}  className="mainbtn button bold wide">Jugar</a></li>
                    </ul>
                </div>
                <div className="image  ">
                    <img src={votodibujo3} alt="" />
                </div>
            </section>

            <section className="bgsection2 section-mt fadeIn spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in">
                <div className="content">
                    <ul className="actions stacked back-in-right">
                        <li><p><span className='subtitle'>Hacé tu pronóstico</span> <br /> Con tu predicción de cuantos puntos va a tener cada candidato participás por un premio!</p></li>
                        <li><p><span className='subtitle'>Estadísticas en tiempo real</span> <br /> Mirá las predicciones de otras personas y enterate de qué piensan los argentinos</p></li>
                        <li><p><span className='subtitle'>Información de las elecciones</span> <br /> Conoce más sobre quiénes se postulan y cómo funciona el proceso democrático</p></li>
                        <li><p><span className='subtitle'>Foros de discusión</span> <br /> Participa en debates saludables y bien moderados con otros ciudadanos</p></li>
                        <li><p><span className='subtitle'>Seguro y anónimo</span> <br /> Tus datos están seguros y tu participación puede ser anónima.</p></li>
                    </ul>
                    <ul className="actions stacked">
                        <li><a href="#" className="mainbtn button bold wide">Jugar</a></li>
                    </ul>
                </div>
                <div className="content  ">
                    <img src={votodibujo4} alt="" style={{ width: '80%', margin:'3em' }} />
                </div>
            </section>

            <section className="section-mt fadeIn wrapper style1 align-center">
                <div className="inner">
                    <h2 className='bold' >¿Querés ser parte del pulso democrático de tu país?</h2>
                    <p className='subtitle'>Sumá tu predicción a Prodix</p>
                    <div className="image  " style={{display:'flex',justifyContent:'center'}}>
                        <img src={votodibujo5} alt="" style={{ width: '95%' }} />
                    </div>
                    <ul className="actions stacked">
                        <li><a href="#" className="mainbtn button bold wide">HACÉ TU PREDICCIÓN</a></li>
                    </ul>
                </div>
                <div className="">
                    <img src={loginbg} alt="" style={{ display: 'none' }} />
                </div>
            </section>
        
            <section className="fadeIn wrapper style1 align-center">
                <div className="inner medium">
                    <h5>&copy; Todos los derechos reservados 2023</h5>
                </div>
            </section>

        </div>
   )
}

export default Landing  