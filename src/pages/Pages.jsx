import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../config/env.js';

import {
    Avatar, Box, Button, Grid, Slider, Typography, Input, Tab, Tabs,
    List, ListItem, ListSubheader, TextField, InputBase
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import LoadingModal from '../components/LoadingModal.jsx';

import logo4 from './img/logo4.png';
import votodibujo1 from './img/votodibujo1.png';
import votodibujo2 from './img/votodibujo2.png';
import votodibujo3 from './img/votodibujo3.png';
import votodibujo4 from './img/votodibujo4.png';
import votodibujo5 from './img/votodibujo5.png';
import loginbg from './img/login_bg.png';
import './Votacion/Votacion.css';
import './styles/main.css';
import './styles/fontawesome-all.min.css';
import './styles/noscript.css';
import './styles/animate.css';

export default function Main() {

    const [page, setPage] = useState('Landing');
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    const Landing = (props) => {
        const onJugar = () => loginWithRedirect({ appState: { returnTo: "/", } });

        // //Animación de las imagenes
        // useEffect(() => {
        //     const handleScroll = () => {
        //         const elementos = document.querySelectorAll('.item');
        //         elementos.forEach((elemento) => {
        //             const rect = elemento.getBoundingClientRect();
        //             if (rect.top < window.innerHeight) {
        //                 elemento.classList.add('animated');
        //             }
        //         });
        //     };

        //     window.addEventListener('scroll', handleScroll);

        //     return () => {
        //         window.removeEventListener('scroll', handleScroll);
        //     };
        // }, []);

        return (
            <div id="wrapper" className="divided">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&display=swap" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
                <link rel="shortcut icon" href="img/logo3.png" type="image/x-icon" />
                <section className="wrapper style1 align-left">
                    <div className="inner row">
                        <div className="col-6 left-aligned" style={{ padding: 0 }}>
                            <a href="#">
                                <img src={logo4} alt="logo" height="80" />
                            </a>
                        </div>
                        <div className='col-6'>
                            <ul className="icons right-aligned" style={{ marginTop: 15 }}>
                                <li><a onClick={onJugar} href="#" className="icon style2 fa-user fa-solid content-align-right"><span className="label">User</span></a></li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="fadeIn spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in">
                    <div className="content back-in-left">
                        <p className="major" style={{}}>¿Quién tiene la posta?</p>

                        <h1 className='bold'>¡Hacé tu pronóstico electoral y compará con el sentir nacional!</h1>
                        <ul className="actions stacked">
                            <li><a onClick={onJugar} className="button big wide smooth-scroll-middle bold mainbtn">Jugar</a></li>
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
                            <li><a href="#" onClick={onJugar} className="mainbtn button bold wide">Jugar</a></li>
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
                            <li><a href="#" onClick={onJugar} className="mainbtn button bold wide">Jugar</a></li>
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
                            <li><a href="#" onClick={onJugar} className="mainbtn button bold wide">Jugar</a></li>
                        </ul>
                    </div>
                    <div className="content  ">
                        <img src={votodibujo4} alt="" style={{ width: '80%', margin: '3em' }} />
                    </div>
                </section>

                <section className="section-mt fadeIn wrapper style1 align-center">
                    <div className="inner">
                        <h2 className='bold' >¿Querés ser parte del pulso democrático de tu país?</h2>
                        <p className='subtitle'>Sumá tu predicción a Prodix</p>
                        <div className="image  " style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={votodibujo5} alt="" style={{ width: '95%' }} />
                        </div>
                        <ul className="actions stacked">
                            <li><a onClick={onJugar} href="#" className="mainbtn button bold wide">HACÉ TU PREDICCIÓN</a></li>
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
    };

    const Votacion = (props) => {
        const navigate = useNavigate();
        const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
        const [values, setValues] = useState(data?.map(x => ({ ...x, value: x.dfltValue, ballotage: null, firstRoundWinner: false })));
        const [openTutorial, setOpenTutorial] = useState(true);
        const [loading, setLoading] = useState(0);
        const [alias, setAlias] = useState(null);
        const [openAlias, setOpenAlias] = useState(false);
        const [_alias, set_Alias] = useState(alias || user?.name || '');

        const onAcceptAlias = async () => {
            const accessToken = await getAccessTokenSilently().catch(console.error);
            await axios.post(`${env.backendUrl}/alias`, _alias, { headers: { 'Authorization': `Bearer ${accessToken}` } }).catch(console.error);
            setOpenAlias(false);
        }

        const handleChangePrimary = (e, x) => {

            if (isIOS && e.type === 'mousedown') return;
            const resetBallotage = _values => _values.map(v => ({ ...v, ballotage: null, firstRoundWinner: false, ballotageWinner: false }));

            let freePoints = values?.reduce((p, x) => p + (x.autoAdjust ? x.value : 0), 0);
            let freePointsElementsCount = values?.reduce((p, x) => p + (x.autoAdjust ? 1 : 0), 0);
            let oldValue = values?.find(v => v.group === x.group)?.value;
            let newValue = parseFloat(Math.min(oldValue + freePoints, e.target.value).toFixed(2));
            let dif = newValue - oldValue;
            let _values = values?.map(d => x.group === d.group ? { ...d, value: newValue } : { ...d })
            _values = _values?.map(d => d.autoAdjust ? { ...d, value: parseFloat((d.value - dif / freePointsElementsCount).toFixed(2)) } : { ...d })

            let [first, second] = _values.filter(v => !v.autoAdjust)?.sort((a, b) => b.value - a.value).slice(0, 2);

            //Direct firstRoundWinner
            if (first?.value > 45) {
                _values = resetBallotage(_values);
                _values.find(v => v.group === first.group).firstRoundWinner = true;
            }
            //Direct firstRoundWinner
            else if (first?.value > 40 && first?.value - second?.value > 10) {
                _values = resetBallotage(_values);
                _values.find(v => v.group === first.group).firstRoundWinner = true;
            }
            //Ballotage participants changed
            else if (first?.value > 0 && second?.value > 0 && ((first && !first.ballotage) || (second && !second.ballotage))) {
                _values = resetBallotage(_values);
                if (first) _values.find(v => v.group === first.group).ballotage = 50;
                if (second) _values.find(v => v.group === second.group).ballotage = 50;
            } else if (first?.value === 0 || second?.value === 0) {
                _values = resetBallotage(_values);
            }

            setValues(_values);
        };

        const handleChangeBallotage = (e, x) => {
            if (isIOS && e.type === 'mousedown') return;
            let _values = values.map(d => x.group === d.group ?
                { ...d, ballotage: e.target.value } :
                { ...d, ballotage: d.ballotage ? parseFloat((100 - e.target.value).toFixed(2)) : null })

            _values = _values.map(d => ({ ...d, ballotageWinner: d.ballotage > 50 ? true : false }));
            setValues(_values)
        };

        const TutorialVotacion = () => {
            const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
            const [activeStep, setActiveStep] = useState(0);
            const [skipped, setSkipped] = useState(new Set());

            const handleNext = () => {
                let newSkipped = skipped;
                if (skipped.has(activeStep)) {
                    newSkipped = new Set(newSkipped.values());
                    newSkipped.delete(activeStep);
                }

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            };

            const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

            const handleSkip = () => {
                if (activeStep !== 1) throw new Error("You can't skip a step that isn't optional.");

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped((prevSkipped) => {
                    const newSkipped = new Set(prevSkipped.values());
                    newSkipped.add(activeStep);
                    return newSkipped;
                });
            };

            return <Dialog className="dialog-background" onClose={e => setOpenTutorial(false)} open={openTutorial} fullWidth maxWidth='80vw'>
                <DialogTitle>Tutorial De Votación</DialogTitle>
                <DialogContent sx={{ height: '80vh' }}>
                    <Box sx={{ height: '60vh', textAlign: 'center' }} children={<img maxWidth={'100%'} height={'90%'} src="./src/landing_mai/img/votodibujo2.png" alt="Descripción" />} />
                    <Box sx={{ width: '100%' }} color={'white'}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (index === 1) labelProps.optional = (<Typography variant="caption">Optional</Typography>);
                                if (skipped.has(index)) stepProps.completed = false;
                                return (<Step key={label} {...stepProps} children={<StepLabel olor='white'  {...labelProps} children={label} />} />);
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (<>
                            <Typography sx={{ mt: 2, mb: 1 }} children='All steps completed - you&apos;re finished' />
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} children={<>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={e => setActiveStep(0)}>Reset</Button>
                            </>} />
                        </>) : (<>
                            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} children={'Back'} />
                                <Box sx={{ flex: '1 1 auto' }} />
                                {activeStep === 1 && (<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} children={'Skip'} />)}
                                <Button onClick={handleNext} children={activeStep === steps.length - 1 ? 'Finish' : 'Next'} />
                            </Box>
                        </>)}
                    </Box>
                </DialogContent>
            </Dialog>
        };

        const onLogin = async () => {
            if (isAuthenticated && user && !isLoading) {
                setLoading(1);
                const accessToken = await getAccessTokenSilently().catch(console.error);
                const { userAgent, hardwareConcurrency: conc, deviceMemory: mem } = navigator;

                let res = await axios.post(`${env.backendUrl}/login`,
                    { ...user, userAgent, conc, mem },
                    { headers: { 'Authorization': `Bearer ${accessToken}` } })
                    .catch(console.error);


                let { votacion, alias } = res?.data || {};
                if (votacion) setValues(JSON.parse((votacion)));
                if (alias) setAlias(Object.keys(JSON.parse(alias))[0]);
                setLoading(0);
                if (!alias) setOpenAlias(true);
            }
        };

        const onVotar = async () => {
            setLoading(1);
            const accessToken = await getAccessTokenSilently().catch(console.error);
            const payload = values.map(x => ({
                name: x.name,
                lastName: x.lastName,
                group: x.group,
                value: parseFloat(parseFloat(x.value).toFixed(2)),
                ballotage: parseFloat(parseFloat(x.ballotage)?.toFixed(2)),
                firstRoundWinner: x.firstRoundWinner,
                ballotageWinner: x.ballotageWinner
            }));
            await axios.post(`${env.backendUrl}/votacion`, values, { headers: { 'Authorization': `Bearer ${accessToken}` } }).catch(console.error);
            setLoading(0);
            navigate('/resultados');
        };

        useEffect(() => { onLogin(); }, [isAuthenticated, user]);

        return (<div style={{
            backgroundImage: "url(/src/pages/Landing/img/bgWave.png)", backgroundSize: 'cover',
            backgroundRepeatt: 'no-repeat', backgroundAttachment: 'fixed', width: '100%', height: '100%', minHeight: '105vh'
        }}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&display=swap" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
            {/* <TutorialVotacion /> */}
            <Dialog open={openAlias}  >
                <h3 className='bold' style={{ paddingLeft: '1em', paddingTop: '1em' }}>Usar un Alias</h3>
                {/* <DialogTitle color={'#71ddf7'}> {"Usar un Alias"} </DialogTitle> */}
                <DialogContent>
                    <DialogContentText color={'#2f2f2f'}>
                        En nuestra plataforma, entendemos y respetamos tu privacidad. Si querés compartir tus predicciones con otros usuarios de manera anónima y sin revelar tu identidad real, podés usar un alias en lugar de tu nombre real.
                    </DialogContentText>
                    <TextField sx={{ paddingTop: '1em' }} onChange={(e, v) => set_Alias(e.target.value)} value={_alias}></TextField>
                </DialogContent>
                <DialogActions>
                    <ul className="actions stacked">
                        <li><a onClick={onAcceptAlias} href="#" className="mainbtn button bold wide">Aceptar</a></li>
                    </ul>
                </DialogActions>
            </Dialog>
            {loading ? <LoadingModal /> : null}
            <Grid container spacing={2} padding={'20px'}>
                <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom component="div"><img src={logo4} alt="logo" style={{ height: '3em', marginTop: '1em', marginLeft: '1em' }} /> </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography style={{ fontWeight: 'bold', marginLeft: '1em' }} variant="h6" gutterBottom component="div">{`¿Cómo creés que van a ser los resultados de las elecciones?`} </Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12}>
                    {values?.map(x =>
                        <Grid item key={x.group} xs={12} style={{ marginLeft: '1em' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Badge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                        badgeContent={<EmojiEvents style={{ fontSize: x.firstRoundWinner ? '3.5vh' : '0', color: 'gold', }} />}  >
                                        <Avatar src={x.profileURL} sx={{ width: '7vh', height: '7vh' }} />
                                    </Badge>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6" overflow={'clip'} fontSize={'2vh'} lineHeight={'3.2'} height={'7vh'} gutterBottom component="div">{`${x.lastName}`} </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Slider
                                        style={{ color: x.color }}
                                        step={0.01}
                                        //valueLabelDisplay="on"
                                        value={x.value}
                                        onChange={e => handleChangePrimary(e, x)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Input
                                        style={{ marginLeft: '1em' }}
                                        value={x.value}
                                        size="small"
                                        onChange={e => handleChangePrimary(e, x)}
                                        inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>)}
                </Grid>
                <Grid item xs={8} style={{ marginTop: '2em' }}>
                    <Typography style={{ fontWeight: 'bold', marginLeft: '1em' }} variant="h6" gutterBottom component="div">{`Si hay ballotage sería entre:`} </Typography>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={12} style={{ marginLeft: '1em' }}>
                    {values.filter(v => v.ballotage).length === 2 ? values.filter(v => v.ballotage)?.map(x =>
                        <Grid item key={x.group} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Badge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                        badgeContent={<EmojiEvents style={{ fontSize: x.ballotageWinner ? '3.5vh' : '0', color: 'gold', }} />}  >
                                        <Avatar src={x.profileURL} sx={{ width: '7vh', height: '7vh' }} />
                                    </Badge>

                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6" overflow={'clip'} fontSize={'2vh'} lineHeight={'3.2'} height={'7vh'} gutterBottom component="div">{`${x.lastName}`} </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Slider style={{ color: x.color }} step={0.01}
                                        //valueLabelDisplay="on"
                                        value={x.ballotage} onChange={e => handleChangeBallotage(e, x)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Input
                                        style={{ marginLeft: '1em' }}
                                        value={x.ballotage}
                                        size="small"
                                        onChange={e => handleChangeBallotage(e, x)}
                                        inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>) : null}
                </Grid>
                <Grid item xs={12} textAlign={'-webkit-right'}>
                    {/* <Button size='small' color='info' className='botton-text botton-resetear'
                        onClick={() => navigate('/resultados')} >
                        Resetear
                    </Button> */}
                    <ul className="actions stacked">
                        <li><a disabled={!values.find(v => v.firstRoundWinner || v.ballotageWinner)}
                            onClick={onVotar} href="#" className="mainbtn button bold wide" style={{ marginRight: '2em', marginBottom: '2em' }}>GUARDAR</a></li>
                    </ul>
                </Grid>
            </Grid>
        </div>);
    };

    const Resultados = (props) => {
        const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
        const [votacion, setVotacion] = useState([]);
        const [tab, setTab] = useState(0);
        const [filter, setFilter] = useState('');

        useEffect(() => {
            getAccessTokenSilently()
                .then(accessToken => axios.get(`${env.backendUrl}/votaciones`, { headers: { 'Authorization': `Bearer ${accessToken}` } }))
                .then(r => setVotacion(r.data))
                .catch(setVotacion([]));
        }, []);

        const navigate = useNavigate();
        const results = votacion.map(x => x.votacion).flat().reduce((p, x) => {
            p[x.lastName] ??= { name: x.name, lastName: x.lastName, logoURL: x.logoURL, profileURL: x.profileURL, votes: [] };
            p[x.lastName].votes.push({ value: x.value, ballotage: x.ballotage, firstRoundWinner: x.firstRoundWinner, ballotageWinner: x.ballotageWinner })
            return p;
        }, {})

        const perGanadorPrimera = (candidato) => (votacion.length > 0 ? results[candidato]?.votes.filter(x => x.firstRoundWinner).length / votacion.length * 100 : 0).toFixed(2);
        const ganadorPrimera = Object.values(results)
            .sort((a, b) => - a.votes.filter(x => x.firstRoundWinner).length + b.votes.filter(x => x.firstRoundWinner).length)[0]?.lastName;
        const perBallo = (votacion?.length > 0 ? votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).length / votacion?.length * 100 : 0).toFixed(2);
        const balloCandPer = votacion?.length > 0 ? (Object.entries(votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).reduce((p, x) => {
            const finalistas = x.filter(x => x.ballotage);
            if (finalistas.length === 2) {
                p[finalistas[0].lastName + '-' + finalistas[1].lastName] ??= 0;
                p[finalistas[0].lastName + '-' + finalistas[1].lastName] += 1;
            }
            return p;
        }, {})).sort((a, b) => a[1] - a[b])[0][1] / votacion.length * 100).toFixed(2) : {};
        const balloCand = votacion?.length > 0 ? Object.entries(votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).reduce((p, x) => {
            const finalistas = x.filter(x => x.ballotage);
            if (finalistas.length === 2) {
                p[finalistas[0].lastName + '-' + finalistas[1].lastName] ??= 0;
                p[finalistas[0].lastName + '-' + finalistas[1].lastName] += 1;
            }
            return p;
        }, {})).sort((a, b) => a[1] - a[b])[0][0].split('-') : {};

        return (<div>
            {votacion.length === 0 ? <LoadingModal /> : null}
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="center">
                <img src={logo4} alt="" style={{ height: '6em', margin: '2em' }} />
                <Typography style={{ fontWeight: '900', fontSize: '6vh' }} variant="h4" gutterBottom component="div">{`Resultados`}</Typography>
                <Typography variant="p" gutterBottom component="div">{`Total de predicciones ${votacion.length} personas`}</Typography>
                <Grid container spacing={2} padding={'2em'} style={{ marginTop: '1em' }} >
                    <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Massa' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Massa?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                    <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Bullrich' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Bullrich?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                    <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Milei' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Milei?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                    <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Massa')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Massa' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                    <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Bullrich')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Bullrich' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                    <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Milei')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Milei' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                    <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Bregman' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Bregman?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                    <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Schiaretti' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Schiaretti?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                    <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Blanco' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={''} />} style={{ display: 'flex', justifyContent: 'center' }} />
                    <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Bregman')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Bregman' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                    <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Schiaretti')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Schiaretti' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                    <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Blanco')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Blanco' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                </Grid>
                <Typography style={{ fontWeight: '600', margin: '1em' }} align='center' variant="h5" gutterBottom component="div"><div>Creen que <span style={{ color: '#f6aef8' }}>{ganadorPrimera}</span> gana en primera vuelta</div></Typography>

                <Grid container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{ backgroundColor: '#f5f5f5', padding: '3em', marginTop: '4em' }}>
                    <Typography style={{ fontWeight: '900', color: '#47D3E5', fontSize: '10vh' }} gutterBottom component="div">{`${perBallo}%`}</Typography>
                    <Typography style={{ fontWeight: '600' }} variant="h5" align='center' gutterBottom component="div">{`Creen que hay ballotage`}</Typography>
                </Grid>
                <Typography style={{ marginTop: '2em', fontWeight: '600', fontSize: '5vh' }} gutterBottom component="div">{`${balloCandPer}%`}</Typography>
                <Grid container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                    <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={5} children={<Avatar style={{ border: 'solid 4px #f6aef8', width: '5em', height: '5em' }} src={results?.[balloCand[0]]?.profileURL} />} />
                    <Grid item xs={2} children={<Typography variant="p" gutterBottom component="div">{`vs`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', fontSize: '3vh' }} align='center' />
                    <Grid style={{ display: 'flex', justifyContent: 'flex-start' }} item xs={5} children={<Avatar style={{ border: 'solid 4px #47D3E5', width: '5em', height: '5em' }} src={results?.[balloCand[1]]?.profileURL} />} />
                </Grid>
                <Typography style={{ fontWeight: '600', margin: '1em' }} align='center' variant="h5" gutterBottom component="div"><div>Creen que hay ballotage entre<span style={{ color: '#f6aef8' }}> {balloCand[0]}</span> y<span style={{ color: '#47D3E5' }}> {balloCand[1]}</span></div></Typography>

                <Typography style={{ fontWeight: '900', fontSize: '5vh', margin: '0.5em', marginTop: '2em' }} align='center' variant="h4" gutterBottom component="div">{`¿Qué predicen los argentinos?`}</Typography>

                <Tabs style={{ marginTop: '2em' }} value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="Primera Vuelta" value={0} />
                    <Tab label="Ballotage" value={1} />
                </Tabs>
                <List sx={{ marginTop: '2em', width: '100%', maxWidth: 800, bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 1000, '& ul': { padding: 0 }, }} subheader={<li />} >
                    <li>
                        <ul>
                            <ListSubheader>
                                <Grid container>
                                    <Grid item xs={3} > <InputBase value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar" style={{ height: '1.2em', m: '.5em' }} /> </Grid>
                                    <Grid item xs={.3} > </Grid>
                                    <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Massa?.profileURL} /></Grid>
                                    <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Bullrich?.profileURL} /></Grid>
                                    <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Milei?.profileURL} /></Grid>
                                    <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Schiaretti?.profileURL} /></Grid>
                                    <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Bregman?.profileURL} /></Grid>
                                    <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Blanco?.profileURL} /></Grid>
                                </Grid>
                            </ListSubheader>
                            {votacion.map((vot, i) => {
                                let a = [0, 1, 2, 3, 4, 5]
                                let arr = tab === 0 ? a.map(i => vot?.votacion[i]?.value) : a.map(i => vot?.votacion[i]?.ballotage);
                                if (filter !== '' && !vot.alias.toLowerCase().includes(filter.toLowerCase())) return null;
                                return (<ListItem key={vot.sub}>
                                    <Grid container spacing={0} height={'1em'} sx={{ backgroundColor: (i % 2 ? '#ededed' : '##dcdcdc') }}>
                                        <Grid item xs={3.3} height={'1em'} ><Typography fontSize={'.75em'} fontWeight={600} style={{ whiteSpace: 'nowrap', overflow: 'hidden', 'text-overflow': 'ellipsis' }}>{vot.alias} </Typography></Grid>
                                        {arr.map(i => <Grid item xs={1.45} height={'1em'} fontSize={'.75em'} fontWeight={500}>{i ?? '-'}</Grid>)}
                                    </Grid>
                                </ListItem>)
                            })}
                        </ul>
                    </li>
                </List>
                <Button variant="contained" onClick={() => navigate('/votacion')} className="mainbtn button bold wide" style={{ borderRadius: '4em', marginTop: '5em' }}>EDITAR MI PRODE</Button>
                <Button variant="contained" onClick={() => navigate('#')} className="mainbtn button bold wide" style={{ borderRadius: '4em', marginBottom: '5em', marginTop: '1em' }}>COMPARTIR</Button>
            </Grid>
        </div >

        )
    }
    switch (page) {
        case 'Landing': return <Landing />;
        case 'Votacion': return <Votacion />;
        case 'Resultados': return <Resultados />;
    }

}