import { useChangeRolMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useChangeRolUser = () => {
    const [
        startChangeRolUserMutation,
    ] = useChangeRolMutation();

    const handleChangeRolUser = async (
        id: number,
        rol: string
    ) => {
        startChangeRolUserMutation({
            id,
            rol
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Rol del usuario cambiado exitosamente!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                console.log(error);

                toast.error("Error al cambiar el rol del usuario!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleChangeRolUser }
}
