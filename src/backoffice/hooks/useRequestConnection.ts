import { useRequestConnectionMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useRequestConnection = () => {
    const [startRequestConnectionMutation] = useRequestConnectionMutation();
  
    const handleRequestConnection = async (idInstancia: number) => {
      startRequestConnectionMutation(idInstancia)
        .unwrap()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((resp) => {
          toast.success("Accion realizada correctamente!", {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch((error) => {
          toast.error(error.data.message + '!', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    };
  
    return { handleRequestConnection };
  }
