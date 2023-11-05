import { useInviteUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useInviteUser = () => {
    const [
        startInviteUserMutation,
    ] = useInviteUserMutation();

    const handleInviteUser = async (
        email: string,
        instanciaId: number,
    ) => {
        startInviteUserMutation({
            instanciaId,
            email,
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                console.log("Invitacion enviada exitosamente!");
                toast.success("Invitacion enviada exitosamente!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                console.log(error);
                toast.error("Error en la invitacion!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleInviteUser }
}
