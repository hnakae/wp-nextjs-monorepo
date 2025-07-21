# WP Next.js Monorepo

This is a monorepo containing a Next.js frontend application and a Dockerized WordPress backend, designed to demonstrate how to build a decoupled WordPress site using GraphQL.

## Info

*   **Next.js Frontend**: Accessible at `http://localhost:3001` (or `http://localhost:3000` if port 3001 is not available).
*   **WordPress Admin**: Accessible at `http://localhost:8080/wp-admin`.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

*   [Docker](https://www.docker.com/get-started) (Docker Desktop recommended)
*   [Node.js](https://nodejs.org/en/download/) and npm (or yarn/pnpm/bun)

### 1. Start Docker Containers

Navigate to the project root directory and bring up the Docker containers:

```bash
npm run docker:up
```

This will start the MariaDB database, WordPress, and the Next.js frontend containers.

### 2. Set up WordPress

Once the WordPress container is running, you need to complete its setup:

1.  **Access WordPress Installation**: Open your web browser and go to `http://localhost:8080`. Follow the on-screen instructions to complete the WordPress installation (e.g., set site title, admin username, password).
2.  **Install and Activate WPGraphQL Plugin**:
    *   Log in to your WordPress admin dashboard (`http://localhost:8080/wp-admin`).
    *   Go to `Plugins` -> `Add New`.
    *   Search for `WPGraphQL`.
    *   Install and activate the plugin.
3.  **Enable Public Introspection for WPGraphQL**:
    *   In the WordPress admin, go to `GraphQL` -> `Settings`.
    *   Under the `General` tab, check the box for `Enable Public Introspection`.
    *   Click `Save Changes`.
4.  **Set Permalinks**:
    *   In the WordPress admin, go to `Settings` -> `Permalinks`.
    *   Select `Post name` (or any other structure besides `Plain`).
    *   Click `Save Changes`.

### 3. Install Node.js Dependencies

Install the necessary Node.js packages for the Next.js frontend:

```bash
npm install
```

### 4. Generate GraphQL Types

Generate the TypeScript types for your GraphQL queries. This step requires the WordPress GraphQL endpoint to be accessible and configured (from step 2).

```bash
npm run codegen
```

### 5. Start the Next.js Development Server

Finally, start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (or `http://localhost:3000`) in your browser to see the Next.js application.