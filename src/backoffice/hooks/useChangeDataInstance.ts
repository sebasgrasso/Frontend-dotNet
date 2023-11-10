import { useChangeDataInstanceMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CambiarDataInstanciaDTO } from "../../interfaces/interfaces";

export const useChangeDataInstance = () => {
    const [startChangeDataInstanceMutation] = useChangeDataInstanceMutation();
  
    const handleChangeDataInstance = async (data: CambiarDataInstanciaDTO) => {
      startChangeDataInstanceMutation(data)
        .unwrap()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((resp) => {
          toast.success("Datos actualizados correctamente!", {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch((error) => {
          toast.error(error.data.message + '!', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    };
  
    return { handleChangeDataInstance };
  }
