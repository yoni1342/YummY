// for authentcated user
export default function (mutation) {
	const { mutate, onDone, loading, onError } = useMutation(mutation, () => ({
		fetchPolicy: "network-only",
		clientId: "authClient",
		context: {
			headers: {
				"x-hasura-role": "user",
			},
		},
	}));

	return {
		onError,
		mutate,
		loading,
		onDone,
	};
}
