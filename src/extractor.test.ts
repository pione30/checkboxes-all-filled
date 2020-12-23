import { extractLinesWithUnfilledCheckbox } from "./extractor";

describe("extractLinesWithUnfilledCheckbox", () => {
  describe("Empty body", () => {
    it("does not have any unfilled checkboxes", () => {
      expect(extractLinesWithUnfilledCheckbox("")).toEqual([]);
    });
  });

  const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  describe("Body without checkboxes", () => {
    const body = `
## Lorem ipsum

${loremIpsum}

### Lists but not checklists

- Alice
- Bob
  - Carol
`;

    it("does not have any unfilled checkboxes", () => {
      expect(extractLinesWithUnfilledCheckbox(body)).toEqual([]);
    });
  });

  describe("Body with filled checkboxes", () => {
    const body = `
## Lorem ipsum

${loremIpsum}

### Filled checkboxes

- [x] Dash

+ [x] plus

* [x] Star
  * [x] Nested star

0. [x] Ordered lists
1. [x] Ordered lists
  22. [x] Ordered lists
  333. [x] Ordered lists
`;

    it("does not have any unfilled checkboxes", () => {
      expect(extractLinesWithUnfilledCheckbox(body)).toEqual([]);
    });
  });

  describe("Body with unfilled checkboxes", () => {
    describe("Bullet list marker", () => {
      const body = `
## Lorem ipsum

${loremIpsum}

### Unfilled checkboxes

- [ ] Dash

+ [ ] plus

* [ ] Star
  * [ ] Nested star
`;

      it("has unfilled checkboxes", () => {
        expect(extractLinesWithUnfilledCheckbox(body)).toEqual([
          "- [ ] Dash",
          "+ [ ] plus",
          "* [ ] Star",
          "  * [ ] Nested star",
        ]);
      });
    });

    describe("Ordered list marker", () => {
      describe("Less than 10 digits", () => {
        const body = `
## Lorem ipsum

${loremIpsum}

### Unfilled checkboxes

0. [ ] Ordered lists
1. [ ] Ordered lists
  22. [ ] Ordered lists
  333. [ ] Ordered lists
  4444) [ ] Ordered lists with )
`;

        it("has unfilled checkboxes", () => {
          expect(extractLinesWithUnfilledCheckbox(body)).toEqual([
            "0. [ ] Ordered lists",
            "1. [ ] Ordered lists",
            "  22. [ ] Ordered lists",
            "  333. [ ] Ordered lists",
            "  4444) [ ] Ordered lists with )",
          ]);
        });
      });

      describe("More than or equal to 10 digits", () => {
        const body = `
## Lorem ipsum

${loremIpsum}

### Unfilled checkboxes

1234567890. [ ] Ordered lists
            123456789012. [ ] Ordered lists
`;

        it("does not have any unfilled checkboxes", () => {
          expect(extractLinesWithUnfilledCheckbox(body)).toEqual([]);
        });
      });
    });

    describe("Following spaces to the list marker", () => {
      describe("1 to 4 spaces", () => {
        const body = `
## Lorem ipsum

${loremIpsum}

### Unfilled checkboxes

- [ ] 1
-  [ ] 2
-   [ ] 3
-    [ ] 4
`;

        it("has unfilled checkboxes", () => {
          expect(extractLinesWithUnfilledCheckbox(body)).toEqual([
            "- [ ] 1",
            "-  [ ] 2",
            "-   [ ] 3",
            "-    [ ] 4",
          ]);
        });
      });

      describe("5 spaces", () => {
        const body = `
## Lorem ipsum

${loremIpsum}

### Unfilled checkboxes

-     [ ] 5
`;

        it("does not have any unfilled checkboxes", () => {
          expect(extractLinesWithUnfilledCheckbox(body)).toEqual([]);
        });
      });
    });
  });
});
