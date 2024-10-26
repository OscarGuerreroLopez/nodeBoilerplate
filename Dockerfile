# Use Node 21.14 or above
FROM node:20.12

# Set working directory in the container
WORKDIR /src

COPY package.json yarn.lock ./

# Copy the app files to the working directory
COPY . .

# Install app dependencies
RUN yarn --omit=dev

# Expose the port the app will run on
EXPOSE 3000

# Command to run your compiled app
CMD ["node", "dist/app.js"]
