import { nanoid } from "nanoid";
export function SortDataWithoutID(data) {
    const processedData = data.map((row, index) => ({
        ...row,
        id: row.id || `row-${index}`, // Use existing `id` or fallback to generated `id`
    }));

    return processedData;
}
