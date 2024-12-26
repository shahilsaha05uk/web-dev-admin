import * as React from "react";
import BasePanel from "./BasePanel";
import { Stack } from "@mui/material";
import ReviewCard from "../ReviewCard";
import { useFetchAllPendingReviews } from "../../utils/externalUtils/fetchers/useFetchAllPendingReviews";
import { useDataMemo } from "../../utils/memos/table/useDataMemo";
import LoadingRadial from "../misc/LoadingRadial";
import ErrorScreen from "../misc/ErrorScreen";
import MessageScreen from "../misc/MessageScreen";

function ReviewCards({ data }) {
	return data.map((item, index) => {
		return <ReviewCard key={index} title={item.name} content={item.comment} />;
	});
}

export default function Review() {
	const { data, isLoading, isError, isSuccess, error } =
		useFetchAllPendingReviews();
	const memoData = useDataMemo(data);

	// Render at loading
	if (isLoading) return <LoadingRadial />;

	// Render at error
	if (isError) {
		console.error("Error fetching data:", error);
		return <ErrorScreen error={error} />;
	}

	// Render at success but no data
	if (data.length === 0 && isSuccess) {
		return <MessageScreen message="No pending reviews" />;
	}

	// Render at success with data
	return (
		<BasePanel>
			<h1>Review</h1>
			<Stack spacing={2}>
				<ReviewCards data={memoData} />
			</Stack>
		</BasePanel>
	);
}
