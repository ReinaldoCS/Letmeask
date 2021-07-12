import { toast } from 'react-hot-toast';

import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

interface RoomCodeProps {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Código copiado');
  }

  return (
    <button onClick={copyRoomCodeToClipBoard} className="room-code">
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span className="code">Sala #{props.code}</span>
    </button>
  );
}
