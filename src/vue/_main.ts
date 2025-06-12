import type { App } from "vue";
import { convexVue } from "convex-vue";

export default (app: App) => {
	app.use(convexVue, { url: import.meta.env.PUBLIC_CONVEX_URL });
};
