import { useUserNotificationsMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UsuarioNotificacionesDTO } from "../../interfaces/interfaces";

export const useUserNotifications = () => {
    const [
        startUserNoficationsMutation,
    ] = useUserNotificationsMutation();

    const handleUserNotifications = async (
        newNotifications:UsuarioNotificacionesDTO
    ) => {
        startUserNoficationsMutation(
            newNotifications
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Notificaciones actualizadas con éxito", {
                    position: toast.POSITION.TOP_RIGHT
                });
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

    return { handleUserNotifications }
}

