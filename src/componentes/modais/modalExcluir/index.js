import '../modal.css';
import api from '../../services/api';
import { useState } from 'react';

export default function Modal({ onClick, id }) {
  const [transacaoId, setId] = useState(id);

  async function submitExcluir(e) {
    e.preventDefault()
    try {
      const response = await api.delete(`/transacao/${transacaoId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <form className="modalExcluir" onSubmit={submitExcluir}>
      <span>Apagar item?</span>
      <div className="simNao">
        <button className='sim'>SIM</button>
        <button className='nao' onClick={onClick}>NÃO</button>
      </div>
    </form>
  </>
}