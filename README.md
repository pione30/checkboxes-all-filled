## Usage

Add an yaml like below as `.github/workflows/checklist.yml` or something to your repository:

```yml
name: Checklist

on:
  pull_request:
    types:
      - opened
      - reopened
      - edited
      - ready_for_review

jobs:
  checkboxes-all-filled:
    name: Checkboxes All Filled
    runs-on: self-hosted
    steps:
      - name: Uses checkboxes-all-filled
        uses: pione30/checkboxes-all-filled@v1
```

## Development

When you change the codes under `src` directory, then `npm run build` to build and commit the outputs under `dist` directory.

When to release the new version, firstly create relese branch to verify (as recommended on the [document](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/about-actions#using-tags-for-release-management)).
