# OSS Actions - Auto Semver

_Easily manage versioning for your repository_

## Usage

```yaml
- uses: oss-actions/auto-semver@<version>
  id: versioning
  with:
    token: ${{ github.token }}
    repository: ${{ github.repository }}
    type: major | minor | patch

- name: Print previous and next semver version
  if: github.ref != steps.versioning.outputs.previous_version_ref
  # ^ this if statement ensures that two versions are not generated
  #   on the same commit.
  env:
    NEXT_VERSION: ${{ steps.versioning.outputs.version }}
    PREVIOUS_VERSION: ${{ steps.versioning.outputs.previous_version }}
  run: |
    echo "Previous version is $PREVIOUS_VERSION"
    echo "Next version is $NEXT_VERSION"
```

> **Note**
>
> This action requires `contents: read` permission for the job. This is so the
> action can read commits and tags for your repository. The GitHub token is used
> together with `git ls-remote --tags ${{ github.repository }}` to find the
> highest semver version.

> **Warning**
>
> This action also outputs all versions prefixed with `v`, for example `v1.2.3`.
> This action will not consider any existing tags that does not match the
> following pattern `v<MAJOR>.<MINOR>.<PATCH>`.
>
> Tags with pre-releases are also not considered (for example
> `v<MAJOR>.<MINOR>.<PATCH>-<PRE>`.)

> **Note**
>
> This action does not require your job to checkout your project repository.

## Inputs

- `token`: This is supposed to contain a
  [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  or `${{ github.token }}`. This is used together with the `git` commandline to
  list commits and tags in your repository.

- `repository`: Which repository to autosemver for. This should normally be set
  to `${{ github.repository }}`.

- `type`: What type of increment to do on the previous version. Supported values
  are `major`, `minor` and `patch`.

## Outputs

- `version`: The next semver version. If the `type` input is `minor` or `patch`
  this defaults to `v0.1.0`. If the `type` is `major` then the version will
  default to `v1.0.0`.

- `previous_version`: The highest and currently available semver tag in the
  repository.

- `previous_version_ref`: The commit reference that the highest and currently
  available semver tag is referencing to.
