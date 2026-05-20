#!/bin/bash

# pnpm tsc --noEmit --watch -p tsconfig.app.json

# Without "--build" it does not show errors. This is because it uses the top-level
# 'tsconfig.json' only, and not 'tsconfig.app.json'
pnpm tsc --build --noEmit --watch
