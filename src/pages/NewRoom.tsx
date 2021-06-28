import { useState, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button/index';
import { database } from '../services/firebase';

// import '../styles/auth.scss';

function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault(); // Previne o reaload após enviar o fumulário

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={ilustrationImg}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-container">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;
