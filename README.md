[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jjperezaguinaga/hello-golem)

# hello-golem
A JavaScript hello world introduction to the Golem Network using a custom Docker image

# setup

`curl -sSf https://join.golem.network/as-requestor | bash -`

# TODO

- [ ] Create a custom `.gitpod.dockerfile` to avoid setting up `yagna` daemon.
- [x] Ensure users understand PATH needs to be updated manually. See [golemfactory/yagna-docs#10](https://github.com/golemfactory/yagna-docs/pull/10)
- [x] Ensure users understand running the yagna daemon opens port `7464` and `7465`. See [golemfactory/yagna-docs#11](https://github.com/golemfactory/yagna-docs/pull/11)
- [x] Ensure users understand their requestor app key is a base64 secret and should kept as such. See [golemfactory/yagna-docs#12](https://github.com/golemfactory/yagna-docs/pull/12)
- [x] Ensure users understant how to fund their nodes and what goes behind the hood to do so. See [golemfactory/yagna-docs#13](https://github.com/golemfactory/yagna-docs/pull/13)