start:
	pnpm build
	pnpm start

analyze:
	banal --metafile workspaces/client/dist/metafile-iife.json
