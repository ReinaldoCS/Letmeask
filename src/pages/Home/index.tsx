import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';

import boosterImg from '../../assets/images/booster.png';
import logoImg from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button/index';
import { ToggleSwitchTheme } from '../../components/ToggleSwitchTheme/index';

import './styles.scss';

function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { isDark } = useTheme();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handlejoinRoom(event: FormEvent) {
    event.preventDefault(); // Previne o reaload após enviar o fumulário

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Código inválido / Sala não existe'); // Melhora: tirar alert e montrar erro no input
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Sala já esta fechada');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
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
          <button onClick={handleCreateRoom} className="create-room-google">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separetor">ou entre em uma sala</div>
          <form onSubmit={handlejoinRoom}>
            <input
              type="text"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
              placeholder="Digite o código da sala"
            />

            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
