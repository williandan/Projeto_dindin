import Logo from '../../logo';
import "./cadastro.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api'

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault()
    try {
      if (!nome || !email || !senha) {
        alert("Por favor,preencha todos os campos")
        return
      } else if (senha !== confirmarSenha) {
        alert("As senhas são diferentes")
      }

      const response = await api.post("/usuario", {
        nome,
        email,
        senha
      })

      navigate('/login');

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='cadastro'>
      <header>
        <Logo />
      </header>
      <section>
        <form onSubmit={submit}>
          <h1>Cadastre-se</h1>
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
          <button>Cadastrar</button>
          <Link className='roxo' to='/login'>Ja tem cadastro? clique aqui!</Link>
        </form>
      </section>
    </div>
  )
}