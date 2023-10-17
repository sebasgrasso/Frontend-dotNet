import { useCreatePostMutation } from "../../store/apis/microbApis";

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
                alert("Post creado con éxito");
            })
            .catch((error) => {
                alert(error.data);
            })
    };

    return { handleCreatePost }
}
