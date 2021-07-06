import { ReactNode } from 'react';
import Modal from 'react-modal';

// import { Button } from '../Button';

import disabledImg from '../../assets/images/disabled.svg';

import './styles.scss';

type ModalProps = {
  openIt: boolean;
  titleModal: string;
  messageModal: string;
  children: ReactNode;
  closeIt: () => void;
};

export function ModalQuestion({
  openIt,
  titleModal,
  messageModal,
  children,
  closeIt,
}: ModalProps) {
  return (
    <Modal
      shouldCloseOnEsc
      onRequestClose={closeIt}
      className="content-modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
      isOpen={openIt}
    >
      <div className="main-modal">
        <img src={disabledImg} alt="Simbolo de alerta" />
        <h1>{titleModal}</h1>
        <span>{messageModal}</span>

        <footer>{children}</footer>
      </div>
    </Modal>
  );
}
