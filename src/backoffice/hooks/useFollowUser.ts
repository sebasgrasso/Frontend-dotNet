import { useFollowUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useFollowUser = () => {
    const [
        startFollowUserMutation,
    ] = useFollowUserMutation();

    const handleFollowUser = async (
        id: number,
    ) => {
        startFollowUserMutation({
            id,
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((response) => {
                toast.success(response.message, {
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

    return { handleFollowUser }
}
