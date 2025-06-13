import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import ConvexTasksCompo from "./convex-tasks-compo";

const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL as string);

export default function () {
	return (
		<React.StrictMode>
			<ConvexProvider client={convex}>
				<ConvexTasksCompo />
			</ConvexProvider>
		</React.StrictMode>
	);
}
