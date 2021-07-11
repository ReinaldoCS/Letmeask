import { useParams, useHistory } from 'react-router-dom';
import {
  AiOutlineCheckCircle,
  AiOutlineComment,
  AiOutlineDelete,
} from 'react-icons/ai';

import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';
import { useModal } from '../../hooks/useModal';

import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo-light.svg';
import excludeImg from '../../assets/images/exclude.svg';
import disabledImg from '../../assets/images/disabled.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';
import excludeImgDark from '../../assets/images/excludeDark.svg';
import disabledImgDark from '../../assets/images/disabledDark.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { ToggleSwitchTheme } from '../../components/ToggleSwitchTheme';

import './styles.scss';

interface RoomProps {
  id: string;
}

function AdminRoom() {
  const params = useParams<RoomProps>();
  const roomId = params.id;
  const history = useHistory();
  const { isDark } = useTheme();
  const { title, questions } = useRoom(roomId);

  const {
    isModalDelete,
    toggleDeleteModal,
    handleDeleteQuestion,
    isModalEndRoom,
    toggleModalEndRoom,
  } = useModal();

  async function handleQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(
    questionId: string,
    isHighlight: boolean,
  ) {
    if (isHighlight) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  }

  return (
    <div id="pagead-min-room">
      <header>
        <div className="content">
          <img src={isDark ? logoImgDark : logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={toggleModalEndRoom} isOutlined>
              Encerrar sala
            </Button>
            <ConfirmDialog
              image={isDark ? disabledImgDark : disabledImg}
              isShown={isModalEndRoom}
              hide={toggleModalEndRoom}
              title="Encerrar sala"
              message="Tem certeza que você deseja encerrar esta sala?"
              textButtonConfirm="Sim, encerrar"
              onConfirm={handleEndRoom}
            />
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
              return (
                <Question
                  key={quest.id}
                  author={quest.author}
                  content={quest.content}
                  isAnswered={quest.isAnswered}
                  isHighlighted={quest.isHighlighted}
                >
                  {!quest.isAnswered ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleQuestionAsAnswered(quest.id)}
                      >
                        <AiOutlineCheckCircle
                          size="24px"
                          className="answered-icon"
                          title="Marcar duvida como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleHighlightQuestion(quest.id, quest.isHighlighted)
                        }
                      >
                        <AiOutlineComment
                          size="24px"
                          className="highlighted-icon"
                          title="Marcar como próximo asunto"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleDeleteModal({ code: quest.id })}
                      >
                        <AiOutlineDelete size="24px" title="Remover pergunta" />
                      </button>
                      <ConfirmDialog
                        image={isDark ? excludeImgDark : excludeImg}
                        isShown={isModalDelete}
                        hide={() => toggleDeleteModal({})}
                        title="Excluir pergunta"
                        message="Tem certeza que você deseja excluir esta pergunta?"
                        textButtonConfirm="Sim, excluir"
                        onConfirm={() =>
                          handleDeleteQuestion({ roomId, questionId: quest.id })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleQuestionAsAnswered(quest.id)}
                      >
                        <AiOutlineCheckCircle
                          size="24px"
                          className="answered-icon"
                          title="Marcar duvida como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleDeleteModal({ code: quest.id })}
                      >
                        <AiOutlineDelete size="24px" title="Remover pergunta" />
                      </button>
                      <ConfirmDialog
                        image={isDark ? excludeImgDark : excludeImg}
                        isShown={isModalDelete}
                        hide={() => toggleDeleteModal({})}
                        title="Excluir pergunta"
                        message="Tem certeza que você deseja excluir esta pergunta?"
                        textButtonConfirm="Sim, excluir"
                        onConfirm={() =>
                          handleDeleteQuestion({ roomId, questionId: quest.id })
                        }
                      />
                    </>
                  )}
                </Question>
              );
            })}
        </div>
      </main>
    </div>
  );
}

export default AdminRoom;
