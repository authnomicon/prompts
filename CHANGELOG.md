# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- `consent/prompt` accepts `client` and `scope` options via res.locals.

### Changed

- Moved `http/consent` component to `consent/prompt`.

## [0.0.3] - 2023-10-20

TODO: Review this for accuracy.

### Removed
- Removed login prompt.  Moved to [`@authnomicon/login`](https://github.com/authnomicon/login).
- Removed logout prompt.  Moved to [`@authnomicon/login`](https://github.com/authnomicon/login).
- Removed select-account prompt.  Moved to [`@authnomicon/login`](https://github.com/authnomicon/login).

## [0.0.2] - 2021-12-02
### Added
- Added `Router#dispatch(name, req, res, next)`.
- Added `logout` prompt.

### Changed
- Renamed `http://i.authnomicon.org/prompts/http/Registry` interface to
`http://i.authnomicon.org/prompts/http/Router`.

### Removed
- Removed `Router#get(name)`. Use `Router#dispatch(name, req, res, next)`.

## [0.0.1] - 2021-10-18

- Initial release.

[Unreleased]: https://github.com/authnomicon/prompts/compare/v0.0.3...HEAD
[0.0.3]: https://github.com/authnomicon/prompts/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/authnomicon/prompts/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/authnomicon/prompts/releases/tag/v0.0.1
