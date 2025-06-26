# Base image
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app (optional; dev server doesn't need this)
# RUN npm run build

# Development server
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
