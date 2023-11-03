export default function (mutation) {
    const { mutate, onDone, loading, onError } = useMutation(mutation, () => ({
      fetchPolicy: "network-only",
    }));
    return{
      onError,
      loading,
      onDone,
      mutate,
    }
  }
  