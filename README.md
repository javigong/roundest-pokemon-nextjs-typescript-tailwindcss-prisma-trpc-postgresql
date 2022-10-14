# Roundest Pokémon Web App - Which Pokémon is most round?

Full stack web app using Next.js, React, TypeScript, Prisma, tRPC, Heroku + PostgreSQL, and Tailwind.

Deployed with Vercel: 

- http://roundest-pokemon-nextjs-typescript-tailwindcss-prisma-javigong.vercel.app/

## Getting Started

Prerequisite:

- Two PostgreSQL databases using Heroku
- npm

Setup

1. Clone repo
2. npm install
3. Create .env file if one does not already exist
4. Add connection URLs for both database and shadow db to .env
5. Initialize database - npx prisma migrate dev
6. Initialize base data set - npm run ts-node ./scripts/fill-db.ts
7. Run dev server npm run dev

## TODO

- [X] Next.js and Tailwind setup
- [X] API setup with tRPC
- [X] Pokemon endpoint
- [X] SSR setup
- [X] Heroku and Prisma setup
- [X] Use next/image to handle image caching and better rendering
- [X] Cache pokemon data fetched from Pokemon API in our db
- [X] Create Prisma relations
- [X] Create script to backfill all pokemon into db
- [X] Create the results page with counting/sorting votes
- [X] Improve loading states between votes
