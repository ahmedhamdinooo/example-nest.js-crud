# ========================
# 1️⃣ Build stage
# ========================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

# Copy source code and build
COPY . .
RUN pnpm run build

# ========================
# 2️⃣ Production stage
# ========================
FROM node:20-alpine AS production

WORKDIR /app

# Copy only what's needed to run
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install -g pnpm
RUN pnpm install --prod

# Run the built app
CMD ["node", "dist/main.js"]
