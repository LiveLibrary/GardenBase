import { useQuery } from "convex/react";
import { api } from "!/_generated/api";

console.log(`import.meta.env.PUBLIC_CONVEX_URL: ${import.meta.env.PUBLIC_CONVEX_URL}`);

function ConvexTasks() {
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

export default ConvexTasks;
