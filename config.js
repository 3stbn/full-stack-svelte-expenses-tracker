export default {
	port: process.env.PORT || 3000,
	URI:
		process.env.MONGO_URI ||
		'mongodb+srv://ravi:dadimawhore@fullstack-svelte.nvrf6.mongodb.net/fullstack-svelte?retryWrites=true&w=majority',
};
