start:
	pnpm build
	pnpm start

build:
	pnpm build

analyze:
	banal --metafile workspaces/client/dist/metafile-iife.json

build-analyze:
	make build
	make analyze
