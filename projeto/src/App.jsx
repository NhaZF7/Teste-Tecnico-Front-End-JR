import { useState } from 'react';
import './App.css';

export default function App(){

    const [elementos, setElementos] = useState([]);
    const [elementosDesfeitos, setElementosDesfeitos] = useState([]);

    function adicionarCirculo(evento){
        let elemento_div = document.getElementsByClassName('campo-elementos')[0];
        let posicaoY = evento.clientY;
        let posicaoX = evento.clientX;

        let novo_circulo = document.createElement('div');
        novo_circulo.classList.add('circulo');
        novo_circulo.style = `top: ${posicaoY-10}px; left: ${posicaoX-10}px`;
        elemento_div.appendChild(novo_circulo);

        setElementos([...elementos, novo_circulo]);
        if(elementosDesfeitos.length > 0){
            setElementosDesfeitos([]);
        }
    }

    function desfazer(){
        let valor_elementos = elementos;
        let elemento_desfeito = valor_elementos.pop();
        elemento_desfeito.remove();
        setElementosDesfeitos([...elementosDesfeitos, elemento_desfeito]);
        setElementos(valor_elementos);
    }

    function refazer(){
        let valor_elementos = elementosDesfeitos;
        let elemento_refeito = valor_elementos.pop();
        document.getElementsByClassName('campo-elementos')[0].appendChild(elemento_refeito);
        setElementos([...elementos, elemento_refeito]);
        setElementosDesfeitos(valor_elementos);
    }

    return(
        <>
            <div className='campo-elementos' onClick={adicionarCirculo}>
            </div>
            <div className='painel'>
                <button className='botao' disabled={elementos.length===0} onClick={desfazer}>Defazer</button>
                <button className='botao' disabled={elementosDesfeitos.length===0} onClick={refazer}>Refazer</button>
            </div>
        </>
    )
}