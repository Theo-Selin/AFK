# AFK

## Different frontends

### `/frontend`

Is running webpack as dev server and bundler with Vuex as state management.

### `/frontend-vite`

Is running Vite as dev server and bundler with the new Vuex killer, Pinia, as state management.

Also has PostCSS support and TailwindCSS configured.

#### PostCSS plugins configured

- Tailwind
- Tailwind Nested (Postcss-nested)
- Autoprefixer

#### Vite config

- API Proxy that proxies `/api` to backend `localhost:3000`
- PostCSS
- @ alias to /src/
- Support for multi filetype import. Can import png, jpg and more inline in js files.
