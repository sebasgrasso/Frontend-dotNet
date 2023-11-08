import { useChangeStatusInstanceMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useChangeStatusInstance = () => {
    const [
        startChangeStatusInstanceMutation,
    ] = useChangeStatusInstanceMutation();

    const handleChangeStatusInstance = async (
    ) => {
        startChangeStatusInstanceMutation().unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Se cambio el estado de la instancia exitosamente!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                toast.error(error.data.message + '!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleChangeStatusInstance }
}
