// ***********************************************
// app.js
// é a verdadeira 'porta de entrada' da aplicação
// ***********************************************

import React from 'react';
import Tabela from './Tabela5';
import Formulario from './Formulario';

/**
 * função que irá interagir com a API,
 * e ler os dados das Fotografias
 */
async function getFotos() {
  /**
   * não podemos executar esta instrução por causa do CORS
   * https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
   * let resposta = await fetch("https://localhost:44342/api/FotografiasAPI/"); 
   * Vamos criar um 'proxy', no ficheiro 'package.json'
   * Depois de criado, é necessário re-iniciar o React  
   */
  // fazer o acesso a um 'endpoint', com os dados das Fotos
  let resposta = await fetch("api/FotografiasAPI/");

  if (!resposta.ok) {
    // não obtivemos o 'código de erro' HTTP 200
    console.error(resposta);
    throw new Error('não foi possível ler os dados das Fotos. Código= ' + resposta.status);
  }

  // devolver os dados a serem usados na componente 
  return await resposta.json();
}

/**
 * função que irá interagir com a API,
 * e ler os dados das Fotografias
 */
async function getCaes() {

  // fazer o acesso a um 'endpoint', com os dados dos Cães
  let resposta = await fetch("api/CaesAPI/");

  if (!resposta.ok) {
    // não obtivemos o 'código de erro' HTTP 200
    console.error(resposta);
    throw new Error('não foi possível ler os dados dos Cães. Código= ' + resposta.status);
  }

  // devolver os dados a serem usados na componente 
  return await resposta.json();
}

/**
 * invoca a API e envia os dados da nova Fotografia
 * @param {*} dadosNovaFotografia 
 */
async function adicionaFoto(dadosNovaFotografia) {

  // fazer o acesso a um 'endpoint', com os dados das Fotos
  let resposta = await fetch("api/FotografiasAPI/",
    {
      method: "POST",
      body: JSON.stringify(dadosNovaFotografia),
      headers: { "Content-Type": "application/json" }
    }
  );

  if (!resposta.ok) {
    // não obtivemos o 'código de erro' HTTP 200
    console.error(resposta);
    throw new Error('não foi possível enviar os dados da nova fotografia. Código= ' + resposta.status);
  }

  // devolver os dados a serem usados na componente 
  return await resposta.json();
}


/**
 * Componente 'principal' do meu projeto
 */
class App extends React.Component {
  /**
   * o Construtor tem SEMPRE este nome
   */
  constructor(props) {
    // a instrução seguinte É SEMPRE a primeira instrução a ser executada
    // dentro do construtor
    super(props);

    this.state = {
      /**
       * irá guardar a lista de Fotografias vindas da API
       */
      fotos: [],
      /**
       * variável que irá guardar a lista de Cães, vindos da API
       */
      caes: [],
      /**
       * estados do projeto, durante a leitura de dados na API
       * @type {"carregando dados" | "erro" | "sucesso"}
       */
      loadState: "carregando dados",
      /**
       * se algo correr mal, irá aqui ser colocado a mensagem de erro
       */
      errorMessage: null,
    }
  }

  /**
   * qd o componente é criado, 
   * será executado automaticamente
   */
  componentDidMount() {
    // ler os dados da Fotografias e adicioná-los à state 'fotos'
    this.loadFotos();
    // ler os dados dos Cães, e adicioná-los à state 'caes'
    this.loadCaes();
  }

  /**
   * invocar o carregamento das Fotografias
   */
  async loadFotos() {
    /** TAREFAS
     * 1. ler os dados da API (fetch)
     * 2. adicionar ao state (setState())
     */
    try {
      // 1.
      this.setState({
        loadState: "carregando dados"
      });
      let fotosDaAPI = await getFotos();

      // 2.
      this.setState({
        fotos: fotosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro ao carregar os dados das Fotos: ", erro)
    }
  }


  /**
   * invocar o carregamento dos dados dos Cães
   */
  async loadCaes() {
    /** TAREFAS
     * 1. ler os dados da API (fetch)
     * 2. adicionar ao state (setState())
     */
    try {
      // 1.
      this.setState({
        loadState: "carregando dados"
      });
      let caesDaAPI = await getCaes();

      // 2.
      this.setState({
        caes: caesDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro ao carregar os dados dos Cães: ", erro)
    }
  }


  /**
   * processar os dados recolhidos pelo Formulário
   * @param {*} dadosDoFormulario 
   */
  handlerDadosForm = async (dadosDoFormulario) => {
    /**
     * TAREFAS:
     * 1. preparar os dados para serem enviados para a API
     * 2. enviar os dados para a API
     * 3. efetuar o reload da tabela
     */

    // 1.
    // já está feito.
    // o parâmetro de entrada -dadosDoFormulario- já contém os dados formatados
    try {
      // 2.
      await adicionaFoto(dadosDoFormulario);

      // 3.
      await this.loadFotos();

    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados da nova fotografia: ", erro)
    }
  }

  render() {
    // ler os dados existentes no array
    const { fotos, caes } = this.state;

    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar dados. Aguarde, por favor...</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage}.</p>
      case "sucesso":
        return (
          <div className="container">
            <h1>Fotografias dos Cães</h1>
            {/* componente para apresentar no ecrã um formulário 
                para efetuarmos o upload de uma imagem */}
            <h4>Carregar nova fotografia</h4>
            <Formulario inDadosCaes={caes}
              outDadosFotos={this.handlerDadosForm}
            />
            <div className="row">
              <div className="col-md-8">
                <hr />
                <h4>Tabela com as fotografias</h4>
                {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosFotos'.
                Neste caso, está a receber o array JSON com os dados das fotos dos Cães,
                lidos da API */}
                <Tabela inDadosFotos={fotos} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}



export default App;
