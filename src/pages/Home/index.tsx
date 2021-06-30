import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';

import ilustrationImg from '../../assets/images/Illustration.svg';
import logoImg from '../../assets/images/logoEveris.svg';
import logoImgDark from '../../assets/images/LogoEverisDark.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import githubIconImg from '../../assets/images/github-icon.svg';

import { Button } from '../../components/Button/index';
import { ToggleSwitchTheme } from '../../components/ToggleSwitchTheme/index';

import './styles.scss';

function Home() {
  const history = useHistory();
  const { user, signInWithGoogle, signInWithGithub } = useAuth();
  const { isDark } = useTheme();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleCreateRoomGitHub() {
    await signInWithGithub();
  }

  async function handlejoinRoom(event: FormEvent) {
    event.preventDefault(); // Previne o reaload após enviar o fumulário

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      // alert('Room does not exists.'); // Melhora: tirar alert e montrar erro no input
      return;
    }
    history.push(`/rooms/${roomCode}`);
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
          <img src={isDark ? logoImgDark : logoImg} alt="Letmeask" />
          <div>
            {isDark ? <span>Light mode</span> : <span>Dark mode</span>}
            <ToggleSwitchTheme />
          </div>
          <button
            onClick={handleCreateRoomGitHub}
            className="create-room-github"
          >
            <img src={githubIconImg} alt="Logo do Google" />
            Crie sua sala com o GitHub
          </button>
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
