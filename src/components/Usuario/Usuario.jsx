import React, {useState} from "react";
import './Usuario.css'
import ReactModal from "react-modal";
import Modal from '../Modal/Modal'

ReactModal.setAppElement('#root');

function Usuario(props) {

    const [modalAberto, setModalAberto] = useState(false)

    const modalCss = {
        content: {
            width: '70%',
            padding: '0',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    function AbrirModal() {
        setModalAberto(true)
    }

    function FecharModal() {
        setModalAberto(false)
    }

    return (
        <>
        <div className="container">

            <div className="container-esquerda">
                <img src={props.img} alt="Imagem do usuário" />
                <div>
                    <h3>{props.name}</h3>
                    <p>ID: {props.id} - Username: {props.username}</p>
                </div>
            </div>

            <div className="container-direita">
                <button onClick={() => AbrirModal()} >Pagar</button>
            </div>

        </div>

        <ReactModal
            isOpen={modalAberto}
            onRequestClose={FecharModal}
            style={modalCss}
        >
            <Modal name={props.name}/>
        </ReactModal>
        </>
    )
}

export default Usuario