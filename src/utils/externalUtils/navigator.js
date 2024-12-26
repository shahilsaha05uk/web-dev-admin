import { ROUTES } from "./constants.js";
import { fetchData } from "./routerUtils/fetcher.js";
import { page_routes } from "./routes.js";

export async function navigateTo(route) {
	await fetchData(route);
	window.location.href = route;
}

export async function navigateToRestaurant(id) {
	await navigateTo(page_routes.restaurant + "/" + id);
}
export async function searchCity(id) {
	await navigateTo(page_routes.searchByCity + "/" + id);
}
