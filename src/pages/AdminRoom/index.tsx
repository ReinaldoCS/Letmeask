import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';

import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';
import deleteImg from '../../assets/images/delete.svg';

import { ToggleSwitchTheme } from '../../components/ToggleSwitchTheme';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { Button } from '../../components/Button';
import { ModalQuestion } from '../../components/ModalQuestion';

import './styles.scss';
import '../../components/ModalQuestion/styles.scss';

interface RoomProps {
  id: string;
}

function AdminRoom() {
  const params = useParams<RoomProps>();
  const roomId = params.id;
  const history = useHistory();
  const { isDark } = useTheme();
  const { title, questions } = useRoom(roomId);
  const [modalEndRoom, setModalEndRoom] = useState(false);

  function openModalEndRoom() {
    setModalEndRoom(true);
  }

  function closeModalEndRoom() {
    setModalEndRoom(false);
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    closeModalEndRoom();
    history.push('/');
  }

  return (
    <div id="pagead-min-room">
      <ModalQuestion
        openIt={modalEndRoom}
        closeIt={closeModalEndRoom}
        titleModal="Encerrar sala"
        messageModal="Tem certeza que você deseja encerrar esta sala?"
      >
        <Button id="cancel" type="button" onClick={closeModalEndRoom}>
          Cancelar
        </Button>
        <Button id="confirm" type="button" onClick={handleEndRoom}>
          Sim, encerrar
        </Button>
      </ModalQuestion>
      <header>
        <div className="content">
          <img src={isDark ? logoImgDark : logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={openModalEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <div className="title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>
          <ToggleSwitchTheme />
        </div>

        <div className="questions-list">
          {questions.length > 0 &&
            questions.map(quest => {
              const contentQ = quest.content;
              return (
                <Question
                  key={quest.id}
                  author={quest.author}
                  content={contentQ}
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(quest.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })}
        </div>
      </main>
    </div>
  );
}

export default AdminRoom;
