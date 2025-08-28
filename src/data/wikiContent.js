const wikiContent = {
    Docker: {
        title: "Docker",
        pages: [
            {
                slug: "docker/file-setup",
                title: "Setting up Docker Files",
                content: [
                    { type: "paragraph", text: "Assuming that you have already installed the docker app on my computer and have it running and your NextJS project is already set up." },
                    { type: "heading", text: "Create Dockerfile" },
                    { type: "paragraph", text: "In your NextJS project, create a 'Dockerfile' file and paste the following:" },
                    { type: "callout", variant: "info", text: "This will create a docker image using Node (V22 in code) and either build the Docker Image using the project or run the image on port localhost:3000" },
                    {
                        type: "code",
                        language: "docker",
                        code: `### /Dockerfile
# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies with clean, repeatable lockfile install
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Next.js needs these at runtime
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Only copy what the server needs to run
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# If you have next.config.js (or similar runtime files), include them:
COPY next.config.js ./

EXPOSE 3000
# Ensure your package.json has:  "start": "next start -p 3000 -H 0.0.0.0"
CMD ["npm", "start"]`
                    },
                    { type: "heading", text: "Create Docker Compose" },
                    { type: "paragraph", text: "This file references the app image from Dockerfile and the mongo image from DockerHub. Follow image setup process for other needed images." },
                    {
                        type: "code",
                        language: "docker",
                        code: `### /docker.compose
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - MONGODB_URI=<MONGO_DB_URL>
    # depends_on:
    #   - mongo

  # mongo:
  #   image: mongo
  #   ports:
  #     - "27017:27017"
  #   environment:
  #     MONGO_INITDB_ROOT_USERNAME: admin
  #     MONGO_INITDB_ROOT_PASSWORD: password
  
  #mongo-express:
  #  image: mongo-express
  #  ports:
  #    - "8081:8081"
  #  environment:
  #    ME_CONFIG_MONGODB_SERVER: mongo
  #    ME_CONFIG_MONGODB_ADMINUSERNAME: admin
  #    ME_CONFIG_MONGODB_ADMINPASSWORD: password
  #    ME_CONFIG_MONGODB_AUTH_DATABASE: admin
  #  depends_on:
  #    - mongo`
                    },
                    { type: "callout", variant: "warning", text: "I have commented out the mongo and mongo-express image for builds as I don't need to test this app on a local mongo database." },
                    // {
                    //     type: "link",
                    //     href: "https://vercel.com/templates",
                    //     text: "Visit Vercel Templates"
                    // },
                    // { type: "heading", text: "Welcome to Kanwar Docs 2" },
                ]
            },
            {
                slug: "docker/ecr",
                title: "Setting up ECR",
                content: []
            },
            {
                slug: "docker/ecs",
                title: "Setting up ECS",
                content: []
            },
            {
                slug: "docker/build-deploy",
                title: "Build and Deploy",
                content: []
            },
        ]
    },
    MongoDB: {
        title: "MongoDB",
        pages: [
            {
                slug: "mongodb/getting-started",
                title: "Getting Started with Mongo",
                content: []
            },
            {
                slug: "mongodb/installation",
                title: "Installation",
                content: []
            }
        ]
    }
};

export default wikiContent;