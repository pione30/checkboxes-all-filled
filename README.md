## 使い方

以下のような yaml を `.github/workflows/checklist.yml` のような適当な名前でリポジトリに追加してください:

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
      - name: Uses pepactions/checkboxes-all-filled
        uses: pepactions/checkboxes-all-filled@v1
```

## 開発

`src` 配下のコードを変更したら `npm run build` を実行し、`dist` に吐かれた成果物も一緒に commit してください。

新しいバージョンをリリースするときはドキュメントで [推奨されている](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/about-actions#using-tags-for-release-management) ように release ブランチを作って検証し、merge したら [tag を打つ](https://git-scm.com/book/en/v2/Git-Basics-Tagging) ようにするのが良いでしょう。バージョニングは [Semantic Versioning](https://semver.org/lang/ja/) に従いましょう。
