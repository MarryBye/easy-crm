# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@12.10.1 --activate

# Copy package manifests
COPY package.json pnpm-lock.yaml* ./

# Configure allowed build scripts for pnpm 12
RUN printf "allowBuilds:\n  esbuild: true\n  '@swc/core': true\n  '@tailwindcss/oxide': true\n" > pnpm-workspace.yaml

# Install dependencies
RUN pnpm install --frozen-lockfile || (pnpm approve-builds --all && pnpm install)

# Copy source code
COPY . .

# Build application
RUN pnpm run build

# Stage 2: Production Nginx runtime
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
