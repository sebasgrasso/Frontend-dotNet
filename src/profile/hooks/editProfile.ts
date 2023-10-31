import { useEditProfileMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UsuarioPerfilUpdateDTO } from "../../interfaces/interfaces";

export const useEditProfile = () => {
    const [
        startEditProfileMutation,
    ] = useEditProfileMutation();

    const handleEditProfile = async (
        newProfile:UsuarioPerfilUpdateDTO
    ) => {
        startEditProfileMutation(
            newProfile
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((resp) => {
                toast.success("Perfil editado con éxito", {
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

    return { handleEditProfile }
}

