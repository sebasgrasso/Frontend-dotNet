import { useBanUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useBanUser = () => {
    const [
        startBanUserMutation,
    ] = useBanUserMutation();

    const handleBanUser = async (
        id: number,
    ) => {
        startBanUserMutation({
            id,
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Usuario baneado exitosamente!", {
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

    return { handleBanUser }
}
