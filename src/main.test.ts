import { main } from "./main";
import * as core from "@actions/core";
import * as github from "@actions/github";

jest.mock("@actions/core");
jest.mock("@actions/github");

describe("main", () => {
  beforeEach(() => {
    github.context.eventName = "pull_request";
    github.context.payload.pull_request = {
      number: 42,
      body: "- [x] filled",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("Normal System", () => {
    test("setFailed is not called", () => {
      main();
      expect(core.setFailed).not.toHaveBeenCalled();
    });

    test("core.info is called with a successful message", () => {
      main();
      expect(core.info).toHaveBeenCalledWith("No unfilled checkbox is found.");
    });
  });

  describe("github.context.eventName is not 'pull_request'", () => {
    beforeEach(() => {
      github.context.eventName = "foo";
    });

    test("setFailed is called", () => {
      main();
      expect(core.setFailed).toHaveBeenCalled();
    });
  });

  describe("github.context.payload.pull_request is undefined", () => {
    beforeEach(() => {
      github.context.payload.pull_request = undefined;
    });

    test("setFailed is called", () => {
      main();
      expect(core.setFailed).toHaveBeenCalled();
    });
  });

  describe("Some checkboxes are left unfilled", () => {
    beforeEach(() => {
      github.context.payload.pull_request.body = "- [ ] unfilled";
    });

    test("setFailed is called", () => {
      main();
      expect(core.setFailed).toHaveBeenCalled();
    });
  });
});
