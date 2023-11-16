import { useChangePasswordMutation} from "../../store/apis/microbApis";
import { toast } from 'react-toastify';

export const useChangePassword = () => {
    const [startChangePasswordMutation] = useChangePasswordMutation();

    const handleChangePassword = async (
        contraseniaActual: string,
        contraseniaNueva: string
    ) => {
        startChangePasswordMutation({
                contraseniaActual,
                contraseniaNueva
        }).unwrap()
        .then((response) => {
            toast.success("Se cambio la contraseña exitosamente!", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .catch((error) => {
            toast.error(error.data.message + '!', {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    };

    return { handleChangePassword };
};
