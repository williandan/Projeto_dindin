import Logo from "../../logo";
import "./home.css";
import { Link, } from "react-router-dom";
import perfil from "../../imgs/avatar.png";
import filtro from "../../imgs/filtro.png";
import sair from "../../imgs/sair.png";
import editar from "../../imgs/editar.png";
import excluir from "../../imgs/excluir.png";
import mais from "../../imgs/+.png";
import { clear, getItem } from "../../utils/storage";
import { useState, useEffect } from "react";
import api from "../../services/api";
import configurarToken from "../../utils/authToken"
import ModalEditarRegistro from "../../modais/modalEditarRegistro";
import ModalEditar from "../../modais/modalEditar/index";
import ModalAdicionar from "../../modais/modalAdicionarRegistro";
import ModalExcluir from "../../modais/modalExcluir";

export default function Home() {
  const [nome, setNome] = useState()
  const [transacoes, setTransacoes] = useState([])
  const [categorias, setCategorias] = useState([])
  const [transacaoId, setTransacaoiD] = useState()
  const [transacaoIdExcluir, setTransacaoIdExcluir] = useState()
  const [modalIsOpenEditar, setIsOpenEditar] = useState(false);
  const [modalIsOpenAdicionarRegistro, setIsOpenAdicionarRegistro] = useState(false);
  const [modalIsOpenEditarRegistro, setIsOpenEditarRegistro] = useState(false);
  const [modalIsOpenExcluir, setIsOpenExcluir] = useState(false);
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const [saldo, setSaldo] = useState(0)


  function openModalEditar() {
    setIsOpenEditar(true);
  }

  function closeModalEditar() {
    setIsOpenEditar(false);
  }

  function openModalAdicionarRegistro() {
    setIsOpenAdicionarRegistro(true);
  }

  function closeModalAdicionarRegistro() {
    setIsOpenAdicionarRegistro(false);
  }

  function openModalEditarRegistro(id) {
    setIsOpenEditarRegistro(true);
    setTransacaoiD(id)
  }

  function closeModalEditarRegistro() {
    setIsOpenEditarRegistro(false);
  }

  function openModalExcluir(id) {
    setIsOpenExcluir(true);
    setTransacaoIdExcluir(id)
  }

  function closeModalExcluir() {
    setIsOpenExcluir(false);
  }

  useEffect(() => {
    const token = getItem("token");
    configurarToken(token);

    pegarUsuario()
    pegarCategorias()
    pegarTransacoes()
    pegarResumo()
  }, [nome, transacoes]);

  const [buttomCategorias, setButtomCategorias] = useState(false)
  const mostrarCategorias = () => {
    setButtomCategorias((prevState) => !prevState)
  }

  const pegarTransacoes = async () => {
    try {
      const response = await api.get("/transacao")
      setTransacoes(response.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  const pegarUsuario = async () => {
    try {
      const response = await api.get("/usuario")
      setNome(response.data.nome)

    } catch (error) {
      console.log(error);
    }
  }

  const pegarResumo = async () => {
    try {
      const response = await api.get("/transacao/extrato")
      setEntrada(response.data.entrada / 100)
      setSaida(response.data.saida / 100)
      setSaldo(response.data.entrada / 100 - response.data.saida / 100)
    } catch (error) {
      console.log(error)
    }
  }

  const pegarCategorias = async () => {
    try {
      const response = await api.get("/categoria")
      setCategorias(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home" >
      <header>
        <Logo />
        <div className="menu">
          <div className="perfil">
            <img className="perfil" onClick={openModalEditar} src={perfil} alt="perfil" />
          </div>
          <h4>{nome}</h4>
          <Link to="/login"><img className="sair" src={sair} onClick={clear} /></Link>
        </div>
      </header>
      <section>
        <div className="ladoEsquerdo">
          <button onClick={mostrarCategorias} className="btnFiltrar"><img src={filtro} alt="filtro" /> Filtrar</button>
          {buttomCategorias && (
            <div className="categoria">
              <h1>Categoria</h1>
              <div className="divCategorias">
                {categorias.map((categoria) => {
                  return <div key={categoria.id} className="categorias">
                    <p>{categoria.descricao}</p>
                    <img src={mais} alt="+" />
                  </div>
                })}
              </div>
              <div className="buttonsFiltro">
                <button className="btnLimparFiltro">Limpar Filtro</button>
                <button className="btnAplicarFiltro">Aplicar Filtro</button>
              </div>
            </div>)}
          <div>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Dia da semana</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao) => {
                  const data = new Date(transacao.data).toLocaleDateString("pt-BR", {
                    year: "2-digit",
                    month: "numeric",
                    day: "numeric",
                  });
                  const date = new Date(transacao.data);
                  const dia = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
                  return <tr key={transacao.id}>
                    <td className="tabelaData">{data}</td>
                    <td>{dia[date.getDay(transacao.data)]}</td>
                    <td>{transacao.descricao}</td>
                    <td>{transacao.categoria_nome}</td>
                    <td style={{ color: (transacao.tipo === "saida") ? "#FA8C10" : "#7B61FF" }}>R${transacao.valor / 100}</td>
                    <td><img src={editar} onClick={() => {
                      openModalEditarRegistro(transacao.id)
                    }} alt="editar" /></td>
                    <td><img src={excluir} alt="excluir" onClick={() => { openModalExcluir(transacao.id) }} />{modalIsOpenExcluir && <ModalExcluir onClick={closeModalExcluir} id={transacaoIdExcluir} />}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          {modalIsOpenEditar && <ModalEditar onClick={closeModalEditar} />}
          {modalIsOpenAdicionarRegistro && <ModalAdicionar onClick={closeModalAdicionarRegistro} />}
          {modalIsOpenEditarRegistro && <ModalEditarRegistro onClick={closeModalEditarRegistro} id={transacaoId} />}
        </div>
        <div className="ladoDireito">
          <div className="resumo">
            <h1>Resumo</h1>
            <div className="entradas">
              <p>Entradas</p>
              <span className="valorEntradas">R${entrada} </span>
            </div>
            <div className="saidas">
              <p>Saidas</p>
              <span className="valorSaidas">R${saida}</span>
            </div>
            <div className="saldo">
              <p>Saldo</p>
              <span className="valorSaldo">R${saldo}</span>
            </div>
          </div>
          <button className="btnAdicionarRegistro" onClick={openModalAdicionarRegistro}>Adicionar Registro</button>
        </div>
      </section >
    </div >
  )
}
