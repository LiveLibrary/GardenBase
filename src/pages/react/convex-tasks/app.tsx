import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import ConvexTasks from "./convex-tasks";

const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL as string);

export default function App() {
	return (
		<React.StrictMode>
			<ConvexProvider client={convex}>
				<ConvexTasks />
			</ConvexProvider>
		</React.StrictMode>
	);
}
