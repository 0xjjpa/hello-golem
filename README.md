[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jjperezaguinaga/hello-golem)

# hello-golem
A TypeScript hello world introduction to the Golem Network using a custom Docker image. Task code is inside `src`, and is built as a Docker image.

# setup

## Installing yagna

`curl -sSf https://join.golem.network/as-requestor | bash -`

## Building docker image

`docker build -t hello-golem:latest -f golem.Dockerfile .`

## Building golem image

`gvmkit-build hello-golem:latest`

## Pushing golem image

`gvmkit-build hello-golem:latest --push`

# usage

## Running task locally

`npm run start src/digits.txt src/values.json`

## Build task locally

`npm run build`

## Running task (prod) locally

`npm run start:prod src/digits.txt dist/values.json`

## Running task (docker) locally

```
docker run \
  -v $(pwd)/src:/hello-golem/resource \
  -v $(pwd)/dist:/hello-golem/output \
  --entrypoint /usr/local/bin/node \˜
  hello-golem:latest /hello-golem/work/dist/task.js /hello-golem/resource/digits.txt /hello-golem/output/output.json
```

## Running task via golem

`npm run golem`

# changelog

04.01.2021 - Latest image at `045d5c974768d61da9720fa362ea0b7b1db47cac4d1728b4cdcc82bb`, reorganized volumes
04.01.2021 - Latest image at `4f101360922ee7c9fb1c865a38a98341d73eef35faa638604a765523`, including `hello.ts`
04.01.2021 - Latest image at `190f6597b32e3cc604a8748ba4794ea9e84be8b900f869bc397ae7e4`

# TODO

- [ ] Create a custom `.gitpod.dockerfile` to avoid setting up `yagna` daemon.
- [ ] Fix `golem.ts` to actually obtain the task that's being requested and the results from.
- [x] Ensure users understand PATH needs to be updated manually. See [golemfactory/yagna-docs#10](https://github.com/golemfactory/yagna-docs/pull/10)
- [x] Ensure users understand running the yagna daemon opens port `7464` and `7465`. See [golemfactory/yagna-docs#11](https://github.com/golemfactory/yagna-docs/pull/11)
- [x] Ensure users understand their requestor app key is a base64 secret and should kept as such. See [golemfactory/yagna-docs#12](https://github.com/golemfactory/yagna-docs/pull/12)
- [x] Ensure users understant how to fund their nodes and what goes behind the hood to do so. See [golemfactory/yagna-docs#13](https://github.com/golemfactory/yagna-docs/pull/13)