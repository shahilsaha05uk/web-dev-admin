/*
	There will be two types of routes:
		API Routes
			- Uses the /api prefix
			- Used for ONLY fetching data from the server
		Page Routes
			- Uses the / prefix
			- Used for rendering the pages with/without data
*/
export const page_routes = {
	// pages
	home: "/home",
	about: "/about",
	search: "/search",
	details: "/details",
	review: "/review",
	restaurant: "/restaurant",

	// search results page
	searchAll: "/search/all",
	searchByCity: "/search/city",
};

export const api_routes = {
	// sorted restaurant data
	ascSortedSearch: "/api/restaurants/asc",
	descSortedSearch: "/api/restaurants/desc",

	// fetchers
	allServices: "/api/services/all",

	// search by city or restaurant
	searchBy: "/api/searchby",

	// post data
	postService: "/api/restaurants/add",

	// update data
	updateService: "/api/restaurants/update",

	// delete data
	deleteService: "/api/restaurants/delete",

	// login data
	postLoginDetails: "/api/auth",
};
