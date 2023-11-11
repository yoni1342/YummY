export default (filter, order, limit, offset, getData) => {
  const { onResult, loading, refetch, onError } = useQuery(
    getData,
    () => ({
      offset: offset && offset.value,
      limit: limit && limit.value,
      order: order.value,
      filter: filter.value,
    }),
    () => ({
      fetchPolicy: "network-only",
      clientId: "authClient",
      context: {
        headers: {
          "x-hasura-role": "user",
        },
      },
    })
  );

  return {
    onResult,
    loading,
    refetch,
    onError,
  };
};
