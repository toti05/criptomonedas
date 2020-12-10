import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a0fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition:background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor: pointer;
    }
`;


const Formulario = ({ guardarCriptoMoneda, guardarMoneda }) => {
    //state del listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    //validar formulario
    const [error, guardarError] = useState(false);

    const arregloMonedas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'ARG', nombre: 'Peso Argentino' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'EUR', nombre: 'Euro' }
    ]
    //Utilizar useMoneda
    const [moneda, SelectMonedas, actualizarState] = useMoneda('Elige tu Moneda', '', arregloMonedas);

    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    //Ejecutar llamado a la api
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, [])

    //cuando el usuatio hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        //pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);
    }
    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMonedas />

            <SelectCripto />

            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
    );
}

export default Formulario;