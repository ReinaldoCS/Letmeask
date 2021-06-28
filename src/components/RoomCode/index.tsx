import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

interface RoomCodeProps {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button onClick={copyRoomCodeToClipBoard} className="room-code">
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
