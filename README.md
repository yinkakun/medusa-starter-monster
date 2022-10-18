# medusa-starter-monster

Medusa Storefronts don't have to be boring. This starter is an elegant and beautiful [NextJS](https://nextjs.org) Storefront for [Medusa](https://medusajs.com). Styled using [TailwindCSS](https://tailwindcss.com), animations with [Framer Motion](https://www.framer.com/motion/), and deployed on [Vercel](https://vercel.com).

Demo: [https://medusa-starter-monster.vercel.app](https://medusa-starter-monster.vercel.app)

## Features

- TypeScript
- Properly documented
- Beautiful by default
- ESLint — To find and fix problems in your code
- Prettier — Code Formatter for consistent style
- Path Mapping — Import components or images using the `@` prefix

## Local Development

Clone the repository and navigate to the directory.

```bash
# clone repository
git clone https://github.com/yinkakun/medusa-starter-monster.git

# navigate to the directory
cd medusa-starter-monster
```

### Setup Medusa Server

1. Navigate to the `server` folder and run `yarn install`
2. Rename the `.env.example` file at the root of the folder to `.env`

3. Set up AWS S3 Bucket. Follow this [tutorial](https://dev.to/yinks/how-to-set-up-an-aws-s3-bucket-for-medusa-s3-file-plugin-4fno) to set up an AWS S3 Bucket for Medusa S3 File Plugin up until the end of the `Create S3 Bucket` section. As the plugin is already installed, you just need to add the environment variables to the `.env` file.

4. Setup Postgres Database On Your Computer:

   - If you don't have Postgres installed, follow these tutorials to install it on [macOS](https://flaviocopes.com/postgres-how-to-install), [Linux](https://www.postgresqltutorial.com/install-postgresql-linux), and [Windows](https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql)

   - Create a database from the command line with `psql`:

     ```bash
     # connect to postgres
     psql postgres

     # create user
     CREATE USER medusa_starter_monster_admin WITH PASSWORD 'medusa_starter_monster_admin_password';

     # create database
     CREATE DATABASE medusa_starter_monster OWNER medusa_starter_monster_admin;

     # grant privileges
     GRANT ALL PRIVILEGES ON DATABASE medusa_starter_monster TO medusa_starter_monster_admin;

     # exit
     quit;
     ```

   - Add database URL to the `.env` file - The URL should be in the format `postgres://<username>:<password>@<host>:<port>/<database>`. The default port is `5432`. So the URL for the database created above would be `postgres://medusa_starter_monster_admin:medusa_starter_monster_admin_password@localhost:5432/medusa_starter_monster`

5. Setup Local Redis Cache:

   - If you don't have Redis installed already, This tutorial explains how to [install Redis](https://redis.io/docs/getting-started/installation)

   - Start Redis if it's not already running in the background. Read more about starting Redis [here](https://tableplus.com/blog/2018/10/how-to-start-stop-restart-redis.html)

     ```bash
     # macOS
      brew services start redis

      # Linux
      sudo systemctl start redis
     ```

   - Add Redis URL to the `.env` file - The default Redis URL on localhost is `redis://localhost:6379`

6. Start the medusa server:

   ```bash
   # run migrations to instantiate the medusa schemas
   medusa migrations run

   # create a medusa admin user
   medusa user -e admin@medusa.com -p medusa-admin-password

   # start server.
   yarn start
   ```

### Setup the Medusa Admin Dashboard

Since the Admin dashboard repo isn't modified, it's not included in this repo.

1. Clone the [medusa-admin](https://github.com/medusajs/admin) repo and install dependencies:

   ```bash
     # clone the medusa admin repo
     git clone https://github.com/medusajs/admin medusa-admin
     cd medusa-admin

     # install dependencies
     yarn install

     # start the admin dashboard dev server (while the medusa server is running)
     yarn start
   ```

2. Log in with the medusa server login credentials created above.
3. Import the `monster-products.csv` file from the project's root folder using the admin dashboard. This will create products in the database that can be used to test the store.
4. At the time of writing, there seems to be a bug with Product Collection creation from imported products. To fix this, we have to create Product collections manually. Fo to the `Products` page in the admin dashboard and click on the `Collections` tab. Click on the `Create Collection` button and create a collection with the names: `Monster Classic`, `Monster Ultra` and `Monster Hydro`, `Juice Monster` and `Java Monster`. Then group the imported products into their respective collections.

### Setup the NextJS Storefront

1. Navigate to the `storefront` folder and install dependencies with `yarn install`
2. While the medusa server is running, start the storefront dev server with `yarn dev`
