// ***********************************************
// app.js
// é a verdadeira 'porta de entrada' da aplicação
// ***********************************************

import React from 'react';
import Tabela from './Tabela5';

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
      // irá guardar a lista de Fotografias vindas da API
      fotos: []
    }
  }

  /**
   * qd o componente é criado, 
   * será executado automaticamente
   */
  componentDidMount() {
    // ler os dados da Fotografias e adicioná-los à state 'fotos'
    this.loadFotos();
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
      let fotosDaAPI = await getFotos();
      // 2.
      this.setState({
        fotos: fotosDaAPI
      });
    } catch (erro) {
      console.error("Erro ao carregar os dados das Fotos: ", erro)
    }
  }


  render() {
    // ler os dados existentes no array
    const { fotos } = this.state;

    // este método É OBRIGATÓRIO
    return (
      <div className="container">
        <h1>Fotografias dos Cães</h1>
        <div className="row">
          <div className="col-md-8">
            <h4>Tabela com as fotografias</h4>
            {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosFotos'.
                Neste caso, está a receber o array JSON com os dados das fotos dos Cães,
                lidos da API */}
            <Tabela inDadosFotos={fotos} />
          </div>
        </div>
      </div>
    );

  }
}



export default App;
