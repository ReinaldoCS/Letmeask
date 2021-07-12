import { useState, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';

import boosterImg from '../../assets/images/booster.png';
import logoImg from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';

import { Button } from '../../components/Button/index';
import { ToggleSwitchTheme } from '../../components/ToggleSwitchTheme/index';

import './styles.scss';

function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const { isDark } = useTheme();

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

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-rooms">
      <aside>
        <img src={boosterImg} alt="ilustração simbolizando evolução" />
        <strong>Juntos podemos ir ainda mais longe!</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-container">
          <img src={isDark ? logoImgDark : logoImg} alt="Letmeask" />
          <div>
            {isDark ? <span>Light mode</span> : <span>Dark mode</span>}
            <ToggleSwitchTheme />
          </div>
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
            Quer entrar em uma sala já existente?{' '}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;
