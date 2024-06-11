This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Scripts

The script users is run using the cmd:

```
npm run users
```

And it will create users data in an excel file to share. It needs a csv file located in static/private folder to process the users

The script morosos is run using the cmd:

```
npm run morosos
```

It needs to have a morosos pdf file in static/private folder before to run and it will generate an excel file

The script morosos is run using the cmd:

```
npm run morosos
```

It needs to have a morosos pdf file in static/private folder before to run and it will generate an excel file

## Database

```
docker-compose up

docker exec -it claros-village-postgres-1 bash

psql -h localhost -U admin -d app

CREATE DATABASE app;

npx prisma migrate dev --name init
```

If the pass is not working:

```
ALTER USER admin PASSWORD 'password';
```

Command to run DB
Create DB `npx prisma migrate dev`

Reset: `npx prisma migrate reset --skip-seed`

Seeding: `npx prisma db seed`

Database

`npx prisma studio`
http://localhost:5555/

TODO LIST

1. gym and soccer reservations

2. reservation by admins

3. my reservations, delete reservations

4. Add error page for token expired in page (/verified) after registration

 
