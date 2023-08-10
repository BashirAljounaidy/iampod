# Use the official Node.js Alpine image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port specified through the PORT environment variable
# If PORT is not provided, the default value 8080 will be used
ENV PORT=3000
EXPOSE $PORT

# Start the application
CMD ["npm","run", "dev"]
