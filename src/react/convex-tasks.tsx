import React from "react";
import { useQuery, ConvexProvider, ConvexReactClient } from "convex/react";
import { api } from "!/_generated/api";

const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL as string);

export default function () {
	return (
		<React.StrictMode>
			<ConvexProvider client={convex}>
				<Tasks />
			</ConvexProvider>
		</React.StrictMode>
	);
}

function Tasks() {
	const tasks = useQuery(api.tasks.get);
	return (
		<div>
			{tasks?.map(({ _id, text, isCompleted }) => (
				<div key={_id}>
					{text} {isCompleted ? "☑" : "☐"}
				</div>
			))}
		</div>
	);
}
