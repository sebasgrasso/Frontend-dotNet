import { useSuspendUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useSuspendUser = () => {
    const [
        startSuspendUserMutation,
    ] = useSuspendUserMutation();

    const handleSuspendUser = async (
        id: number,
        fecha: Date
    ) => {
        startSuspendUserMutation({
            id,
            fecha
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Usuario suspendido exitosamente!", {
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

    return { handleSuspendUser }
}
