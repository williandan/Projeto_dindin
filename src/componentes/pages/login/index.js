import './login.css';
import Logo from '../../logo';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { setItem, getItem } from "../../utils/storage"

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault()

    try {
      if (!email || !senha) {
        alert("Por favor,preencha todos os campos")
        return
      }

      const response = await api.post("/login", {
        email,
        senha
      })

      const token = response.data.token
      setItem("token", token);
      navigate("/home")

    } catch (error) {
      alert(error.response.data.mensagem);
      console.log(error)
    }
  }

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      navigate("/home")
    }

  },);

  return (
    <div className="login">
      <header>
        <Logo />
      </header>
      <section>
        <div className='publi' >
          <h1>Controle suas <span className='roxo'>finanças</span>,
            <br /> sem planilha chata.</h1>
          <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
          <Link className='roxo' to='/cadastro'><button>Cadastre-se</button></Link>
        </div>
        <form onSubmit={submit}>
          <h1>Login</h1>
          <div className="input inputEmail">
            <label htmlFor="email">E-mail</label>
            <input type="email" id='email' value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <label htmlFor="senha">Senha</label>
            <input type="password" id='senha' value={senha}
              onChange={(e) => setSenha(e.target.value)} />
          </div>
          <button>Entrar</button>
        </form>
      </section>
    </div>
  );
}
