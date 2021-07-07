import Modal from 'react-modal';

import { Button } from '../Button';

import './styles.scss';

type ModalProps = {
  isShown: boolean;
  title: string;
  message: string;
  hide: () => void;
  textButtonConfirm: string;
  onConfirm: () => Promise<void>;
  image: string;
};

export function ConfirmDialog({
  isShown,
  title,
  message,
  hide,
  textButtonConfirm,
  onConfirm,
  image,
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
        <img src={image} alt="Simbolo de alerta" />
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
