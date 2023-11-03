import { useMutation } from "@apollo/client";
import { UPLOAD_IMAGE } from "../graphql/mutation/uploadImage.gql";

export default function (base64Image) {
    const { mutate, onDone, loading, onError } = useMutation(UPLOAD_IMAGE, () => ({
        fetchPolicy: "network-only",
    }));
    return{
        onError,
        loading,
        onDone,
        mutate,
    }

    mutate({
        variables: {
            base64Image,
        },
    });
}