import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
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
          <button
            type="submit"
            onClick={handleCreateRoom}
            className="create-room"
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separetor">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
