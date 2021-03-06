// Formulario.js
// este ficheiro irá conter o código para
// representar o formulário no ecrã
// ***************************************************

import React from 'react'


/**
 * Mostra uma lista com os Cães existentes,
 * para o utilizador escolher um
 */
const EscolheCao = (props) => {
    // vamos recuperar os dados do parâmetro de entrada: inListaCaes
    // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
    const opcoes = props.inListaCaes.map((cao) => {
        return (
            <option key={cao.idCao}
                required
                value={cao.idCao}>{cao.nomeCao}
            </option>
        );
    }
    )

    return (
        <select required className="form-select" onChange={props.outIdCaoEscolhido}>
            <option value="">Escolha um cão</option>
            {opcoes}
        </select>
    );
}


/**
 * Formulário para adicionar (fazer upload) uma Fotografia
 */
class Formulario extends React.Component {

    constructor(props) {
        super(props);

        // variáveis para guardar os dados introduzidos pelo utilizador, no Formulário
        this.state = {
            fichFoto: null,
            localDaFoto: "",
            dataDaFoto: "",
            idDoCao: ""
        }
    }

    /**
     * processar os dados fornecidos pelo utilizador na escolha de um cão
     * @param {*} evento - id do cão que o utilizador seleciona
     */
    handlerCaoChange = (evento) => {
        //neste sítio poderia ser efetuado algum tipo de validação dos id do cão escolhido...

        // guardar os dados recolhidos pelo <select></select>
        this.setState({
            idDoCao: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador no upload da foto do cão
     * @param {*} evento - dados adicionados pelo utilizador
     */
    handlerFotoChange = (evento) => {
        //neste sítio poderia ser efetuado algum tipo de validação da foto escolhida...

        // guardar os dados recolhidos pelo <select></select>
        this.setState({
            fichFoto: evento.target.files[0]
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre a data da foto
     * @param {*} evento - dados adicionados pelo utilizador
     */
    handlerDataChange = (evento) => {
        // guardar os dados recolhidos sobre a data da Foto
        this.setState({
            dataDaFoto: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador no nome do local onde a foto foi tirada
     * @param {*} evento - dados adicionados pelo utilizador
     */
    handlerLocalChange = (evento) => {
        // validar os valores introduzidos na TextBox
        if (/\d/.test(evento.target.value)) {
            evento.target.setCustomValidity("Não são permitidos números aqui.");
            return;
        } else {
            evento.target.setCustomValidity("");
        }

        // guardar os dados recolhidos
        this.setState({
            localDaFoto: evento.target.value
        });
    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento - dados recolhido pelo <form></form>
     */
    handlerSubmitForm = (evento) => {
        // impedir o formulário de autoenviar os dados para o servidor
        // essa tarefa cabe, neste projeto, ao componente <App/>
        evento.preventDefault();

        // preparar os dados para serem enviados para a <App/>
        // posso já enviar os dados prontos para serem adicionados à API
        let dadosForm = {
            UploadFotografia: this.state.fichFoto,
            DataFoto: this.state.dataDaFoto,
            Local: this.state.localDaFoto,
            CaoFK: this.state.idDoCao
        };

        // concretizar a exportação de dados para a <App/>
        this.props.outDadosFotos(dadosForm);
    }

    render() {
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        const { inDadosCaes } = this.props;

        return (
            // o 'return' só consegue devolver UM objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-4">
                        Fotografia: <input
                            type="file"
                            required
                            accept=".jpg,.png"
                            onChange={this.handlerFotoChange}
                            className="form-control" /><br />
                        Data da Foto: <input
                            type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            onChange={this.handlerDataChange}
                            className="form-control" /><br />
                    </div>
                    <div className="col-md-4">
                        Local da Foto: <input
                            type="text"
                            required
                            onChange={this.handlerLocalChange}
                            className="form-control" /><br />
                        Cão: <EscolheCao inListaCaes={inDadosCaes}
                            outIdCaoEscolhido={this.handlerCaoChange}
                        />
                        <br />
                    </div>
                </div>
                <input type="submit" value="Adicionar foto" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Formulario;

