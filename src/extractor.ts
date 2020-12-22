export const extractLinesWithUnfilledCheckbox = (
  pullRequestBody: string
): Array<string> =>
  pullRequestBody
    .split("\n")
    .filter((line) =>
      /^(?:[-+*]|\d{1,9}[.)])\s{1,4}\[\s\]\s/.test(line.trimStart())
    );
