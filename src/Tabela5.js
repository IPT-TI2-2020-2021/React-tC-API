// *********************************
// Tabela5.js
// *********************************

import React from 'react';

/**
 * componente que será utilizada na construção da Tabela
 */
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Cão</th>
                <th>Fotografia</th>
                <th>Data</th>
                <th>Local</th>
            </tr>
        </thead>
    );
}

/**
 * componente que representa o Corpo da Tabela
 * arrow function
 * Esta versão da componente recebe como parâmetro o conjunto das 'props'
 * existentes no projeto
 */
const CorpoTabela = (props) => {
    // vamos recuperar os dados do parâmetro de entrada: inDadosFotosCorpoTabela
    // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
    const linhas = props.inDadosFotosCorpoTabela.map((linha) => {
        return (
            <tr key={linha.idFoto}>
                <td>{linha.nomeCao}</td>
                <td>
                    <img src={'fotos/' + linha.nomeFoto}
                        alt={'foto do cão ' + linha.nomeCao}
                        title={linha.nomeCao}
                        height="50"
                    />
                </td>
                <td>{linha.dataFoto}</td>
                <td>{linha.localFoto}</td>
            </tr>
        );
    }
    )

    return (<tbody>{linhas}</tbody>);
}


/**
 * componente Tabela
 */
class Tabela5 extends React.Component {

    render() {
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        const { inDadosFotos } = this.props;

        return (
            <table className="table">
                <CabecalhoTabela />
                {/* CorpoTabela tem um 'parâmetro de entrada', chamado 'inNomesDosAlunos'.
                    Apesar do nome do parâmetro ser diferente do atribuído à Tabela5,
                    a sua função é igual.
                */}
                <CorpoTabela inDadosFotosCorpoTabela={inDadosFotos} />
            </table>
        );
    }
}

export default Tabela5;
