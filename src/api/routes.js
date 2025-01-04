/*
	There will be two types of routes:
		API Routes
			- Uses the /api prefix
			- Used for ONLY fetching data from the server
		Page Routes
			- Uses the / prefix
			- Used for rendering the pages with/without data
*/

export const api_routes = {
    // sorted restaurant data
    ascSortedSearch: '/api/service/asc',
    descSortedSearch: '/api/service/desc',

    // fetchers

    // search by city or restaurant
    searchBy: '/api/searchby',

    // update data

    // login data
    postLoginDetails: '/api/auth',

    // ========================
    // db routes
    // ========================
    // service data
    allServiceIDs: '/api/db/service/pk/all',
    allServices: '/api/db/service/all',
    addService: '/api/db/service/add',
    updateService: '/api/db/service/update',
    deleteService: '/api/db/service/delete',

    // addon data
    allAddons: '/api/db/addon/all',
    addAddon: '/api/db/addon/add',
    deleteAddon: '/api/db/addon/delete',
    updateAddon: '/api/db/addon/update',
};
