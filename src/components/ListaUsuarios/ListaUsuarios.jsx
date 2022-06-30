import React, {useState, useEffect} from "react";
import Usuario from "../Usuario/Usuario";

export default function ListaUsuarios() {
    //Cria uma variavel e uma função que vai incrementar essa variavel
    const [usuarios, setUsuarios] = useState([])

    //useEffect é chamado apenas após a renderização da tela.
    //Primeiro indica onde ele irá buscar (no caso a URL). Depois (then) transforma o retorno em um Json. Depois (outro then) pego esse retorno json e envio para o state usuarios(setUsuarios), ou seja, disponibilizo os dados da URL na variavel usuarios.
    useEffect(
        () => {
        fetch('https://www.mocky.io/v2/5d531c4f2e0000620081ddce')
            .then( (resp) => resp.json())
            .then((json) => {setUsuarios(json)})
    });

    //Utilizo o map para transformar os dados (lista usuarios), coloco um argumento (itensUsuario) e puxo eles pelas propriedades do objeto da URL (id, name, img e username). A key é um identificador em elementos para controlar o estado da lista, precisa ser um número que não se altera, por isso utilizei o mesmo valor do id.
    return (
        usuarios.map((itensUsuario) => (
          <>
            <Usuario
              key={itensUsuario.id}
              id={itensUsuario.id}
              img={itensUsuario.img}
              name={itensUsuario.name}
              username={itensUsuario.username}
            />
          </>
          ))
    )
}