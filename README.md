# Dissertation Interface
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More About Nextjs

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Getting Started
### Requirements
- [ Docker and Docker Compose](https://www.docker.com/products/docker-desktop/)
- Node Version Manager (NVM)
    - [Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades)
    - [Mac](https://medium.com/devops-techable/how-to-install-nvm-node-version-manager-on-macos-with-homebrew-1bc10626181)
  
### Clone the project
- `git clone https://github.com/Olaheavy2021/dissertation_interface_web_app.git`

### Setup Node and NVM
- `nvm use 18.17.1`

### DockerSetup 
 - Create a network for the application
   -  `docker network create dissertation_app_network`

- Start up application and build images 
   - `docker compose up -d --build`

- Start the application
    - `docker compose up`

- Stop the application
    - `docker compose stop`

- Stops and removes all the containers
    - `docker compose down`


