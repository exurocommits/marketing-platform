FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/.next ./app/.next
COPY --from=builder /app/public ./app/public
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error('Health check failed')})"
CMD ["npm", "start"]
