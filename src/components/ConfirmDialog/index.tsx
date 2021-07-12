import React from 'react';
import Modal from 'react-modal';

import { IconBaseProps } from 'react-icons';

import { Button } from '../Button';

import './styles.scss';

type ModalProps = {
  isShown: boolean;
  title: string;
  message: string;
  hide: () => void;
  textButtonConfirm: string;
  onConfirm: () => Promise<void>;
  icon: React.ComponentType<IconBaseProps>;
};

export function ConfirmDialog({
  isShown,
  title,
  message,
  hide,
  textButtonConfirm,
  onConfirm,
  icon: Icon,
}: ModalProps) {
  const modal = (
    <Modal
      shouldCloseOnEsc
      onRequestClose={() => hide}
      className="content-modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      isOpen={isShown}
    >
      <div className="main-modal">
        {Icon && <Icon size="52px" />}
        <h2>{title}</h2>
        <span>{message}</span>

        <footer>
          <Button id="cancel" onClick={hide}>
            Cancelar
          </Button>
          <Button id="confirm" onClick={onConfirm}>
            {textButtonConfirm}
          </Button>
        </footer>
      </div>
    </Modal>
  );

  return isShown ? modal : null;
}
