import { useState, useEffect } from 'react';

import { database } from '../services/firebase';
import { useAuth } from './useAuth';

interface QuestionType {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likedId: string | undefined;
}

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionsHighlight, setQuestionsHighlight] = useState<QuestionType[]>(
    [],
  );
  const [questionsAnswered, setQuestionsAnswered] = useState<QuestionType[]>(
    [],
  );
  const [onlyQuestions, setOnlyQuestions] = useState<QuestionType[]>([]);

  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likedId: Object.entries(value.likes ?? {}).find(
              ([, like]) => like.authorId === user?.id,
            )?.[0],
          };
        },
      );

      const orderQuestionsByLikeCount = parsedQuestions.sort(
        (questA, questB) => {
          if (questA.likeCount > questB.likeCount) {
            return -1;
          }
          if (questA.likeCount < questB.likeCount) {
            return 1;
          }
          return 0;
        },
      );

      const orderQuestionsByNotAnswer = orderQuestionsByLikeCount.sort(
        (questA, questB) => {
          if (questA.isAnswered > questB.isAnswered) {
            return 1;
          }
          if (questA.isAnswered < questB.isAnswered) {
            return -1;
          }
          return 0;
        },
      );

      const orderQuestionsByHighlight = orderQuestionsByNotAnswer.sort(
        (questA, questB) => {
          if (questA.isHighlighted > questB.isHighlighted) {
            return -1;
          }
          if (questA.isHighlighted < questB.isHighlighted) {
            return 1;
          }
          return 0;
        },
      );

      const orderOnlyQuestionHighlight = orderQuestionsByHighlight.filter(
        quest => quest.isHighlighted === true,
      );

      const orderOnlyQuestionAnswered = orderQuestionsByHighlight.filter(
        quest => quest.isAnswered === true,
      );

      const orderOnlyQuestions = orderQuestionsByHighlight.filter(
        quest => quest.isAnswered === false && quest.isHighlighted === false,
      );

      setTitle(databaseRoom.title);
      setQuestions(orderQuestionsByHighlight);
      setQuestionsHighlight(orderOnlyQuestionHighlight);
      setQuestionsAnswered(orderOnlyQuestionAnswered);
      setOnlyQuestions(orderOnlyQuestions);
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id]);

  return {
    questions,
    title,
    questionsHighlight,
    questionsAnswered,
    onlyQuestions,
  };
}
