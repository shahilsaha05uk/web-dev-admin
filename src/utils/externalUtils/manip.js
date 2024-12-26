import { nanoid } from "nanoid";
export function SortDataWithoutID(data) {
	const processedData = data.map((row, index) => ({
		...row,
		id: row.id || `row-${index}`, // Use existing `id` or fallback to generated `id`
	}));

	return processedData;
}

export function createRestaurant(name, city, postcode, description) {
	const newRecord = {
		id: nanoid(),
		name: name,
		city: city,
		postcode: postcode,
		coordinates: {
			lat: 0,
			lng: 0,
		},
		description: description,
	};
	return newRecord;
}

export function ConvertSecondsToMilliseconds(seconds) {
	return seconds * 1000;
}
export function ConvertMinutesToMilliseconds(minutes) {
	return minutes * 60000;
}
