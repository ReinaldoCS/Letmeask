import { Link } from 'react-router-dom';

import errorImg from '../../assets/images/404.png';

import './styles.scss';

function NotFoundPage() {
  return (
    <div className="main">
      <div className="content">
        <h1>404</h1>
        <p>Ah! Você viu? Você pode estar erado!</p>
        <span>(ou pode ser nós)...</span>
        <p>... de qualquer foram, você provavelmente deve</p>
        <Link to="/"> voltar para a página inicial</Link>
      </div>
      <img src={errorImg} alt="chegando no limite" />
    </div>
  );
}

export default NotFoundPage;
