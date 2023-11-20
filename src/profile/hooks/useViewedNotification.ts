import { useNotificationViewedMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useViewedNotification = () => {
    const [
        startViewedNotificationMutation,
    ] = useNotificationViewedMutation();

    const handleViewedNotification = async (
        id: string
    ) => {
        startViewedNotificationMutation(
            id
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                if(error.status != 500 && error.data?.message != null)
                toast.error(error.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                else console.log(error);
            })
    };

    return { handleViewedNotification }
}

