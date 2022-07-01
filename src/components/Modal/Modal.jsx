import React from "react";
import './modal.css';
import { cartoes } from '../Cartoes/Cartoes';
import { Mascara } from "../Mascara/Mascara";

const Modal = (props) => {
    const dadosCartao = async (evento) => {
        evento.preventDefault();

        //Utilizando o .find(), eu faço com que cada um dos objetos da array fiquem dentro de (itemCartao), dessa forma eu coloco uma condição para que se o valor da propriedade "numero_cartao" for igual ao valor do select, ele me retorna aquele objeto. Dessa forma consigo depois coletar informações dentro do objeto usando selecionaCartao.nomeDaPropriedade.
        const selecionaCartao = cartoes.find((itemCartao) => {return itemCartao.numero_cartao === evento.target.elements["cartaoEscolhido"].value});

        //Agora eu faço uma requisição HTTP e pego os dados da URL utilizando fetch (ou seja, obtenho dados sem que a pagina precise ser carregada). Por estar usando uma função assincrona, posso armazenar o resultado do fetch em uma const response. Porém, antes da invocação do fetch, utilizo a AWAIT. O que significa que enquanto a resposta da requisição não chegar, nenhum código abaixo de AWAIT será executado. E quando a resposta da invocação for obtida, será resultado em uma PROMISE e o AWAIT vai atribuir para a const response só o valor resolvido dessa PROMISE. E para obter de fato o corpo da resposta, precisamos formatar para JSON. Por isso abaixo insiro a const data, que recebe AWAIT response.json. Esse AWAIT é necessário pois o response.json irá resultar em uma PROMISE, ou seja, o AWAIT espera a PROMISE ser resolvida e atribui apenas o valor resolvido para a const data.
        const response = await fetch("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989", {
            method: "POST",
            body:{
                numero_cartao: selecionaCartao.numero_cartao,
                cvv: selecionaCartao.cvv,
                data_expiracao: selecionaCartao.data_expiracao,

                value: evento.target.elements["inputPagamento"],
                },
        })
        const data = await response.json()
        console.log(data)

        //Condição que verifica se o valor do select é igual ao cartão válido na API. Se for true, será exibido a mensagem de aprovado, se for false, será exibido a mensagem de recusado.
        const cartao = evento.target.elements["cartaoEscolhido"].value
        if (cartao === "1111111111111111") {
            document.querySelector('.pagamento-cliente').innerHTML = 'Recibo de pagamento'
            document.querySelector('.formulario-pagamento').style.display = 'none';
            document.querySelector('.aprovado').style.display = 'block';
        } else {
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

