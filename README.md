This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements
- yarn (better to use because no package-lock.json and dependencies can be wrong)
- node.js v16+
- Empty port 3000 for the localhost

## Getting Started
1. Install dependencies
```bash
yarn install
````
2. Copy env variables
```bash
cp .env.example .env.local
```
3. Add required env variables (from Spotify)
4. Run the development server:
```bash
yarn dev
```

Note: make sure you run your project in the port `3000`. You need this because Spotify callback waiting project in localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Challenge information
This project aim to solve Frontend developer challenge in AppTweak.
[Challenge link](Frontend_developer_challenge.pdf)

## List of technologies
- Next.js - framework for React with different type of rendering and optimisation
- React
- Typescript
- Chakra UI - UI library with theming
- Prettier - code style formatting
- Eslint - code linter
- Redux - global store
- Redux-saga - side effect management for Redux
- axios - HTTP fetching library
- react-query - fetch, update and cache data library
