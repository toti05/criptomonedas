import React, {useState,useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';

//Syled Components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns:repeat(2,1fr);
    column-gap: 2rem;
  }
`;

//imagen
const Imagen = styled.img`
  max-width:100%;
  margin-top:5rem;
`;

//h1
const Heading = styled.h1`
  font-family:'Bebas Neue',cursive;
  color:#fff;
  text-align: left;
  font-weight:700;
  font-size:50px;
  margin-bottom:50px;
  margin-top:80px;
  /* seudo elemento */
  &::after{
    content:'';
    width:100px;
    height:5px;
    background-color:#66a2fe;
    display:block;
  }
`;

function App() {
  //state
  //para moneda y cripto
  const [moneda,guardarMoneda]= useState ('');
  const [criptomoneda,guardarCriptoMoneda]= useState ('');
  //guardar resultado
  const[resultado,guardarResultado]= useState({});
  //state spinner
  const [cargando,guardarCargando] = useState(false);

  //useEffect para calcular los valores de moneda y cripto
  useEffect(()=>{

    const cotizarCriptoMoneda = async()=>{
    //evitamos la ejecucion la primera vez
    if( moneda ==='')return;
    
    //consultar api para la cotizacion
    const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const resultado =  await axios.get(url);

    //mostrar el spinner
    guardarCargando(true)
    //ocultar el spinner y mostrar el resultado
    setTimeout(()=>{
      //cambiar el estado de cargando
      guardarCargando(false)

      //guardar cotizacion
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    },3000);
    
  }
    cotizarCriptoMoneda();
    
},[moneda,criptomoneda])

//mostrar spinner o resultado
const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt='Imagen cripto'
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante
              
        </Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />

        {componente}
        
      </div>
    </Contenedor>

  );
}

export default App;
