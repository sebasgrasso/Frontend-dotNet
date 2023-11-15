import { usePrivateBlockUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';

export const useBlockPrivateUser = () => {
    const [startBlockPrivateUserMutation] = usePrivateBlockUserMutation();

    const handleBlockPrivateUser = async (
        id: number,
        isBloqueado: boolean | null,
        isSilenciado: boolean | null,
        minutosSilenciado: number | null
    ) => {
        startBlockPrivateUserMutation({
            id,
            body: { 
                isBloqueado: isBloqueado,
                isSilenciado: isSilenciado,
                minutosSilenciado: minutosSilenciado
            }
        }).unwrap()
        .then((response) => {
            const isBloqueado = response.isBloqueado;
            const mensaje = isBloqueado ? "Usuario bloqueado exitosamente!" : "Usuario desbloqueado exitosamente!";
            toast.success(mensaje, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .catch((error) => {
            toast.error(error.data.message + '!', {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    };

    return { handleBlockPrivateUser };
};
