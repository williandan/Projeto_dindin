import "../modal.css"
import x from "../../imgs/x.png"
import { useState } from "react";
import api from "../../services/api";

export default function Modal({ onClick }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function submitEditarPerfil(e) {
    e.preventDefault()

    try {
      if (!nome || !email || !senha) {
        return alert("Por favor,preencha todos os campos")
      } else if (senha !== confirmarSenha) {
        return alert("As senhas são diferentes")
      }

      const response = await api.put("/usuario", {
        nome,
        email,
        senha
      })

      onClick()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="modal">
        <form onSubmit={submitEditarPerfil}>
          <div className="menu">
            <h2>Editar Perfil</h2>
            <img src={x} onClick={onClick} alt="fechar" />
          </div>
          <div className="input">
            <label htmlFor="nome">Nome</label>
            <input type="text" id='nome' value={nome}
              onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="input">
            <label htmlFor="email">E-mail</label>
            <input type="email" id='email' value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <label htmlFor="senha">Senha</label>
            <input type="password" id='senha' value={senha}
              onChange={(e) => setSenha(e.target.value)} />
          </div>
          <div className="input">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input type="password" id='confirmarSenha' value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)} />
          </div>
          <button className="confirmar">Confirmar</button>
        </form>
      </div>
    </>
  )
}
