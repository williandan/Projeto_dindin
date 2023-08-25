import "../modal.css";
import { useState, useEffect } from "react";
import api from "../../services/api";
import x from "../../imgs/x.png"
import configurarToken from "../../utils/authToken"
import { getItem } from "../../utils/storage";

export default function Modal({ onClick, modalIsOpenAdicionarRegistro }) {
  useEffect(() => {
    const token = getItem("token");
    configurarToken(token)
  }, []);

  const [entrada, setEntrada] = useState(true);
  const [saida, setSaida] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [valor, setValor] = useState(0)
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("-")

  function tipoEntrada() {
    setEntrada(true)
    setSaida(false)
  }

  function tipoSaida() {
    setSaida(true)
    setEntrada(false)
  }

  const pegarCategorias = async () => {
    try {
      const response = await api.get("/categoria")
      setCategorias(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  pegarCategorias()

  async function submitAdicionarRegistro(e) {
    e.preventDefault()
    let tipo = "entrada"
    if (saida) {
      tipo = "saida"
    }

    try {
      if (!valor || !data) {
        return alert("Por favor,preencha todos os campos")
      }
      const response = await api.post("/transacao", {
        descricao,
        valor,
        data,
        categoria_id: categoria,
        tipo,
      })

      onClick()
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <div className="modal">
      <form onSubmit={submitAdicionarRegistro}>
        <div className="menu">
          <h2>Adicionar Registro</h2>
          <img src={x} alt="fechar" onClick={onClick} />
        </div>
        <div className="btnEntradaSaida">
          <button type="button" className="entrada" onClick={tipoEntrada} style={{ background: (entrada) ? "#3A9FF1" : "" }}>Entrada</button>
          <button type="button" className="saida" onClick={tipoSaida} style={{ background: (saida) ? "red" : "" }}>Saida</button>
        </div>
        <div className="input">
          <label htmlFor="valor">Valor</label>
          <input type="number" id="valor" onChange={e => setValor(e.target.value * 100)} />
        </div>
        <div className="input">
          <label htmlFor="categoria">Categoria</label>
          <select name="categoria" value={categoria} onChange={e => {
            setCategoria(e.target.value)
          }
          }>
            <option value="0">Selecione uma Categoria</option>
            {categorias.map((categoria) => {
              return <option key={categoria.id} value={categoria.id}>{categoria.descricao}</option>
            })}
          </select>
        </div>
        <div className="input">
          <label htmlFor="data">Data</label>
          <input type="date" id="data" onChange={e => setData(e.target.value)} />
        </div>
        <div className="input">
          <label htmlFor="descricao">Descrição</label>
          <input type="text" id="descricao" onChange={e => setDescricao(e.target.value)} />
        </div>
        <button className="confirmar">Confirmar</button>
      </form>
    </div>
  </>
}