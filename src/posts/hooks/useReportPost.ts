import { useReportPostMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DenunciaCreateDTO } from "../../interfaces/interfaces";

export const useReportPost = () => {
    const [
        startReportPostMutation,{
            isLoading,
            status ,
            error,
            isError,
            isSuccess,
            data,
          }
    ] = useReportPostMutation();

    const handleReportPost = async (datosReport:DenunciaCreateDTO) => {
        startReportPostMutation(
            datosReport
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((resp) => {
                toast.success("Denuncia efectuada con éxito", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                toast.error("Error efectuando la denuncia", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleReportPost,
        isLoading,
        status,
        error,
        isError,
        isSuccess,
        data, }
}
