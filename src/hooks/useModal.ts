import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { database } from '../services/firebase';

type UserModalProps = {
  roomId: string;
  questionId: string;
};

type CodeType = {
  code?: string;
};

export function useModal() {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEndRoom, setIsModalEndRoom] = useState(false);
  const [coded, setCoded] = useState('');

  const toggleModalEndRoom = () => {
    setIsModalEndRoom(!isModalEndRoom);
  };

  const toggleDeleteModal = ({ code }: CodeType) => {
    if (code) {
      setCoded(code);
    }

    setIsModalDelete(!isModalDelete);
  };

  const handleDeleteQuestion = async ({ roomId }: UserModalProps) => {
    await database.ref(`rooms/${roomId}/questions/${coded}`).remove();
    setIsModalDelete(!isModalDelete);
    toast.success('Excluido');
  };

  return {
    isModalDelete,
    toggleDeleteModal,
    handleDeleteQuestion,
    isModalEndRoom,
    toggleModalEndRoom,
  };
}
