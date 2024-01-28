# Documentation on Using Prisma in the Project

## To initialize the database:

> [!WARNING]
> Verify beforehand that the `./prisma` folder is deleted.

- `npx prisma migrate dev --name init`

## Update schemas
- `npx prisma generate`

## To visualize the database (default port 500):

- `npx prisma studio`
