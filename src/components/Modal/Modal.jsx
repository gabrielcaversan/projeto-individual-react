import React, { useState } from "react";
import './modal.css';
import { cartoes } from '../Cartoes/Cartoes';
import { Mascara } from "../Mascara/Mascara";

const Modal = (props) => {

    const [pagamento, setPagamento] = useState(false);

    const dadosCartao = async (evento) => {
        evento.preventDefault();

        const formData = new FormData(evento.target);
        const valor = formData.get("inputPagamento")
        const cartao = formData.get("cartaoEscolhido");
        const selecaoCartao = cartoes.find((cartaoPropriedades) => cartaoPropriedades.numero_cartao === cartao);

        await (
            await fetch("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
                {
                    method: "POST",
                    body: {
                        numero_cartao: cartao,
                        cvv: selecaoCartao.cvv,
                        data_expiracao: selecaoCartao.data_expiracao,

                        value: valor,
                    },
                })
        ).json();


        //Condição que verifica se o numero do cartão é igual ao cartão válido na API. Se for true, será exibido a mensagem de aprovado, se for false, será exibido a mensagem de recusado.
        if (cartao === "1111111111111111") {
            setPagamento(true);
            document.querySelector('.pagamento-cliente').innerHTML = 'Recibo de pagamento'
            document.querySelector('.formulario-pagamento').style.display = 'none';
            document.querySelector('.aprovado').style.display = 'block';
        } else {
            setPagamento(true);
            document.querySelector('.pagamento-cliente').innerHTML = 'Recibo de pagamento'
            document.querySelector('.formulario-pagamento').style.display = 'none';
            document.querySelector('.recusado').style.display = 'block';
        }
    }

    return (
        <div className="pagamento">

            <div className="pagamento-cliente">
                Pagamento para <span>{props.name}</span>
            </div>

            <div>

                <form
                    className="formulario-pagamento"
                    onSubmit={dadosCartao}>

                    <input
                        type="text"
                        placeholder="R$ 0,00"
                        name="inputPagamento"
                        onKeyUp={Mascara}
                        maxLength="20"
                        autoComplete="off"
                        required
                    />

                    <select name="cartaoEscolhido">
                        {/* Faço um map transformando os dados da array cartoes (localizada em Cartoes.jsx), depois coloco um argumento (cartao) para buscar as propriedades do objeto, no caso o "numero_cartao". */}
                        {cartoes.map((cartao) => {
                            return (
                                <option
                                    key={cartao.numero_cartao}
                                    value={cartao.numero_cartao}
                                >
                                    Cartão com final {cartao.numero_cartao.substring(12)}
                                </option>
                            )
                        })}
                    </select>
                    <div className="formulario-pagamento-botao">
                        <button className="botao-voltar" onClick={props.botao}>Voltar</button>
                        <button className="botao-enviar" type="submit">Efetuar pagamento</button>
                    </div>

                </form>

            </div>

            {/* Divisões para pagamento aprovado ou recusado */}
            <div className="aprovado">
                O pagamento foi concluído com <span>sucesso</span>.
                <p ><button className="botao-voltar" onClick={props.botao}>Voltar</button></p>
            </div>
            <div className="recusado">
                O pagamento <span>não</span> foi concluído com sucesso
                <p><button className="botao-voltar" onClick={props.botao}>Voltar</button></p>
            </div>
        </div>
    )
}

export default Modal

