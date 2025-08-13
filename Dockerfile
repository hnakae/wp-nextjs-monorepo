# 1) Install deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2) Build
FROM deps AS builder
COPY . .
RUN npm run build

# 3) Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm","start"]