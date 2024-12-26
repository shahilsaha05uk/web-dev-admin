import axios from "axios";
import { getURL } from "./getURL";

export async function post(route, data) {
	try {
		const response = await axios.post(getURL(route), data);
		return response;
	} catch (error) {
		console.error("Error posting data:", error);
		return null;
	}
}

export async function postData(route, data) {
	try {
		const response = await post(route, { data });
		console.log("Response:", response);
		return response.data;
	} catch (error) {
		console.error("Error posting data:", error);
		return null;
	}
}
