import { useState, FormEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo-light.svg';
import nothingImg from '../../assets/images/nothing.png';
import logoImgDark from '../../assets/images/logo-dark.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { ToggleSwitchTheme } from '../../components/ToggleSwitchTheme';

import './styles.scss';

interface RoomProps {
  id: string;
}

function Room() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const history = useHistory();
  const params = useParams<RoomProps>();
  const roomId = params.id;
  const {
    title,
    questions,
    onlyQuestions,
    questionsAnswered,
    questionsHighlight,
  } = useRoom(roomId);
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');

    toast.success('Enviado com sucesso');
  }

  async function handleLikeQuestion(
    questionId: string,
    likedId: string | undefined,
  ) {
    if (likedId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likedId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={isDark ? logoImgDark : logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
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

        <form onSubmit={handleSendNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.currentTarget.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button onClick={() => history.push('/')}>
                  faça seu login
                </button>
                .
              </span>
            )}
            <Button disabled={!user || newQuestion.trim() === ''}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        {questions.length > 0 ? (
          <>
            <div className="questions-list">
              {questionsHighlight.length > 0 && (
                <div className="separetor">Respondendo</div>
              )}
              {questionsHighlight.map(question => (
                <Question
                  key={question.id} // algoritmo de reconciliação
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <button
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likedId)
                    }
                    className={`like-button ${question.likedId ? 'liked' : ''}`}
                    type="button"
                    aria-label="marcar como gostei"
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <BiLike size="24" />
                  </button>
                </Question>
              ))}
            </div>

            <div className="questions-list">
              {onlyQuestions.length > 0 && (
                <div className="separetor">Perguntas</div>
              )}
              {onlyQuestions.map(question => (
                <Question
                  key={question.id} // algoritmo de reconciliação
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <button
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likedId)
                    }
                    className={`like-button ${question.likedId ? 'liked' : ''}`}
                    type="button"
                    aria-label="marcar como gostei"
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <BiLike size="24" />
                  </button>
                </Question>
              ))}
            </div>

            <div className="questions-list">
              {questionsAnswered.length > 0 && (
                <div className="separetor">Respondendo</div>
              )}
              {questionsAnswered.map(question => (
                <Question
                  key={question.id} // algoritmo de reconciliação
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <button
                    className={`like-button ${question.likedId ? 'liked' : ''}`}
                    type="button"
                    aria-label="marcar como gostei"
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <BiLike size="24" />
                  </button>
                </Question>
              ))}
            </div>
          </>
        ) : (
          <div className="nothing-found">
            <h2>Nenhuma pergunta por aqui...</h2>
            <img src={nothingImg} alt="Nenhuma pergunta encontrada" />
            <span>
              Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
            </span>
          </div>
        )}
      </main>
    </div>
  );
}

export default Room;
