import axios from "axios";
import { api_routes } from "../routes.js";
import { getURL } from "./getURL.js";

export async function fetchData(route) {
	try {
		const response = await axios.get(getURL(route));
		return response.data; // Return the list directly
	} catch (error) {
		console.error("Error fetching data:", error);
		return null; // Return an empty array if there's an error
	}
}
export async function fetchAllUserDetails() {
	const response = await fetchData(api_routes.allUsers);
	return response.data;
}

export async function fetchSearchByData(type) {
	const response = await fetchData(api_routes.searchBy + "/" + type);
	return response.data;
}

export async function fetchAllCities() {
	const response = await fetchData(api_routes.allCitiies);
	return response.data;
}

export async function fetchAllSortedRestaurants(order) {
	const route =
		order === "asc" ? api_routes.ascSortedSearch : api_routes.descSortedSearch;
	const response = await fetchData(route);
	return response.data;
}
export async function fetchAllPendingReviews() {
	const response = await fetchData(api_routes.allPendingReviews);
	return response.data;
}
//================================================================================================
// Database routes
export async function fetchAllServices() {
	const response = await fetchData(api_routes.allServices);
	return response.data;
}
