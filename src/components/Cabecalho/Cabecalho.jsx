import React, {Component} from "react";
import './Cabecalho.css';
import CabecalhoImagem from './cabecalho-dinheiro.png'


export default class Cabecalho extends Component {
    render(){
    return (
        <div className="cabecalho">
            <img className="cabecalho-imagem" src={CabecalhoImagem} alt="Imagem de dinheiro" />
            <h1>Transferência de Dinheiro</h1>
            <img className="cabecalho-imagem" src={CabecalhoImagem} alt="Imagem de dinheiro" />
        </div>
        )
    }
}
