import { useCreatePostMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useCreatePost = () => {
    const [
        startCreatePostMutation,
    ] = useCreatePostMutation();

    const handleCreatePost = async (
        instanciaId: number,
        usuarioId: number,
        contenido: string,
    ) => {
        startCreatePostMutation({
            instanciaId,
            usuarioId,
            contenido
        }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((resp) => {
                toast.success("Post creado exitosamente!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch((error) => {
                toast.error("Error en la creacion del post!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleCreatePost }
}
