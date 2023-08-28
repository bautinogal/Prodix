import { Avatar, Box, Button, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = (props) => {
    const history = useNavigate();

    return (<div>
        <div style={{ textAlign: 'center' }} >
            <p>Crear una aplicación de pronóstico electoral que sea accesible y fácil de entender para los usuarios es una excelente idea para fomentar la participación cívica y ofrecer una ventana al sentir popular. Aquí te dejo algunas ideas sobre cómo podrías explicar tu app de una manera amigable:</p>
            <h1>Prodix</h1>
            <p>"Inmersión en la democracia desde tu móvil. ¡Haz tu pronóstico electoral y compara con el sentir nacional!"</p>
            <h3>Funcionalidades Clave</h3>
            <ol>
                <li>
                    <strong>Haz tu Pronóstico</strong>: Elige a tus candidatos favoritos en cada categoría y comparte tus predicciones.
                </li>
                <li>
                    <strong>Estadísticas en Tiempo Real</strong>: Ve cómo se inclina la balanza según las predicciones de otros usuarios.
                </li>
                <li>
                    <strong>Información de Candidatos</strong>: Conoce más sobre quienes se postulan para cargos públicos.
                </li>
                <li>
                    <strong>Foros de Discusión</strong>: Participa en debates saludables y bien moderados con otros ciudadanos.
                </li>
                <li><strong>Seguridad y Anonimato</strong>: Tus datos están seguros y tu participación es anónima.
                </li>
            </ol>
            <h3>Cómo Usarla</h3>
            <p>"Una vez que descargues la app, podrás ingresar de manera anónima o crear un perfil para guardar tus pronósticos. Luego, simplemente sigue los pasos para hacer tu pronóstico y participar en discusiones."</p>
            <h3>Llamado a la Acción</h3>
            <p>"¿Quieres ser parte del pulso democrático de tu país? ¡Descarga [nombre de la app] y haz oír tu voz!"</p>
            <h3>Invitación a Compartir</h3>
            <p>"Si te gusta la app, ¡compártela con amigos y familia para que más voces sean escuchadas!"</p>
            <p>Recuerda que la transparencia y la privacidad son cruciales cuando se trata de temas políticos, así que asegúrate de tener una política de privacidad sólida y fácil de entender.</p>
            <p>Espero que estas ideas te sean de ayuda y te deseo mucho éxito con tu proyecto.</p>
            <Button variant="contained" onClick={() => history('/votacion')}>Comenzar</Button>
        </div>
    </div>)
}

export default Landing