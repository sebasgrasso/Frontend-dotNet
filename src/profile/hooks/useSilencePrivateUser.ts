import { usePrivateBlockUserMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';

export const useSilencePrivateUser = () => {
    const [startBlockPrivateUserMutation] = usePrivateBlockUserMutation();

    const handleSilencePrivateUser = async (
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
            const isSilenciado = response.isSilenciado;
            const mensaje = isSilenciado ? "Usuario silenciado exitosamente!" : "Silencio al usuario quitado exitosamente!";
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

    return { handleSilencePrivateUser };
};
