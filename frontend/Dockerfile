# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the Next.js application runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]