# API_Restfull-TypeScript

# Extensões usadas:

- ESLint
- Prettier
- Docker
- Material Icon Theme
- Dracula Official
- DotENV

# Comandos usados no terminal para as dependências

Iniciando projeto:
- yarn init -y

Adicionando o TypeScript:
- yarn add typescript ts-node-dev @types/node tsconfig-paths -D
- yarn tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
- yarn tsc
- node build/server.js
- yarn dev

Adicionando ESLint:
- yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
- yarn lint

Adicionando Prettier:
- yarn add prettier -D
- yarn add eslint-config-prettier@6.15.0 eslint-plugin-prettier@3.2.0 -D
