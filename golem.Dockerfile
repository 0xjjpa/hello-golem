FROM node:alpine as builder

WORKDIR /hello-golem/work

COPY ["./package.json", "./package-lock.json", "/hello-golem/work/"]

RUN npm ci

COPY "./" "/hello-golem/work/"

RUN npm run build
RUN npm prune --production

# ===============
FROM node:alpine as runtime

WORKDIR /hello-golem/work
ENV NODE_ENV=production

COPY --from=builder "/hello-golem/work/dist/" "/hello-golem/work/dist/"
COPY --from=builder "/hello-golem/work/node_modules/" "/hello-golem/work/node_modules/"
COPY --from=builder "/hello-golem/work/package.json" "/hello-golem/work/package.json"

VOLUME /hello-golem/work /hello-golem/output /hello-golem/resource
# Temporarily disabling entrypoint to test golem setup.
# ENTRYPOINT ["npm", "run", "start:prod"]
