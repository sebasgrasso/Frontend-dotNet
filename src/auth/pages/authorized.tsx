import { useLocation, useNavigate } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { useAppDispatch } from '../../hooks/hooks';
import { startEmailAndPasswordLogin } from '../../store/apis/thunks';

const Authorized = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const instancia = pathParts[1]; 
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

  let accessToken;
  if (token) {
    accessToken = Base64.decode(token);
    dispatch(startEmailAndPasswordLogin(accessToken));
    navigate(`/${instancia}`);
  }
};

export default Authorized;
