import { useChangeStatusReportMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useChangeStatusReport = () => {
    const [startChangeStatusReportMutation] = useChangeStatusReportMutation();
  
    const handleChangeStatusReport = async (
      post: string,
      s: string
      ) => {
      startChangeStatusReportMutation({
        post,
        s
      })
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
  
    return { handleChangeStatusReport };
  }
