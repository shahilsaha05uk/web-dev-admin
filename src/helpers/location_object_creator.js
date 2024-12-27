export function GetLocationObject(place) {
    if (!place) return null;

    const { geometry, formatted_address } = place;
    let coordinates = null;
    let address = null;

    if (geometry) {
        const { lat, lng } = geometry.location;
        coordinates = {
            lat: lat(),
            lng: lng(),
        };
    }

    if (formatted_address) {
        address = formatted_address;
    }

    return {
        address: address,
        coordinates: coordinates,
    };
}
