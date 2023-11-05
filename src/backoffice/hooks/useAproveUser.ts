import { useAproveUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useAproveUser = () => {
    const [
        startAproveUserMutation,
    ] = useAproveUserMutation();

    const handleAproveUser = async (
        id: number,
    ) => {
        startAproveUserMutation({
            id,
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Usuario aprobado exitosamente!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                console.log(error);
                toast.error("Error en la aprobacion del usuario!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleAproveUser }
}
