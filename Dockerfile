

# Use a Node.js image to build the application.
# "AS builder" gives this stage a name so we can use its output later.
FROM dhi.io/node:24-alpine3.22-dev AS builder

# Set the working directory inside the container.
# All following commands will run from /app.
WORKDIR /app

# Copy only package.json and package-lock.json first.
# This helps Docker cache npm dependencies if the source code changes.
COPY package.json package-lock.json* ./

# Install project dependencies.
# - Uses npm ci for a clean and reproducible installation.
# - Caches downloaded npm packages to speed up future builds.
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the project files into the container.
COPY . .

# Build the production-ready React application.
# The output will be generated inside the "dist" folder.
RUN npm run build




# Use a lightweight Nginx image to serve the built React application.
FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS runner

# Copy the custom Nginx configuration into the container.
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React files from the builder stage.
# --chown ensures the nginx user owns these files.
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

# Switch to the non-root nginx user for better security.
USER nginx

# Inform Docker that Nginx listens on port 8080.
# (This does not expose the port to your computer automatically.)
EXPOSE 8080

# Specify the executable that starts when the container launches.
# Here, it starts the Nginx server using the custom configuration.
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]

# Pass additional arguments to Nginx.
# "daemon off;" keeps Nginx running in the foreground,
# which is required for Docker containers.
CMD ["-g", "daemon off;"]