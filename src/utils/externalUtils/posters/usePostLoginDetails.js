import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../routerUtils/post";
import { api_routes } from "../routes";
import axios from "axios";
import { getURL } from "../routerUtils/getURL";

export default function usePostLoginDetails() {
	// Define the mutation
	const mutation = useMutation({
		mutationFn: async (loginDetails) => {
			const response = await post(api_routes.postLoginDetails, loginDetails);
			return response;
		},
	});

	return mutation;
}
