import { ErrorBoundary } from "react-error-boundary";
import BasePanel from "../panels/BasePanel";

export default function ErrorHandler({ children }) {
	return (
		<ErrorBoundary
			fallbackRender={fallbackRender}
			onError={(error, errorInfo) => {
				// Optionally log the errorInfo if needed
				console.error("Error caught by ErrorBoundary:", error);
				console.error("Component Stack Trace:", errorInfo?.componentStack);
			}}
		>
			{children}
		</ErrorBoundary>
	);
}

function fallbackRender({ error, resetErrorBoundary }) {
	// Call resetErrorBoundary() to reset the error boundary and retry the render.

	return (
		<BasePanel sx={Styles.page}>
			<div role="alert">
				<p>Something went wrong:</p>
				<pre style={{ color: "red" }}>{error.message}</pre>
				<p>
					For more details, check the developer console or use a logging service
				</p>
				<button onClick={resetErrorBoundary}>Retry</button>
			</div>
		</BasePanel>
	);
}

const Styles = {
	page: {
		backgroundColor: "white",
		display: "flex",
		flex: 1,
		padding: 2,
	},
};
