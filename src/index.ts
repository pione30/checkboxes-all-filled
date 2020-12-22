import * as core from "@actions/core";
import * as github from "@actions/github";
import { extractLinesWithUnfilledCheckbox } from "./extractor";

try {
  if (github.context.eventName !== "pull_request") {
    throw new Error("This action must be triggered by `pull_request` event.");
  }

  if (github.context.payload.pull_request === undefined) {
    throw new Error(
      "The requested payload seems NOT to be one of the Pull Request API."
    );
  }

  const linesWithUnfilledCheckbox = extractLinesWithUnfilledCheckbox(
    github.context.payload.pull_request.body ?? ""
  );

  core.info(linesWithUnfilledCheckbox.join("\n"));
} catch (error) {
  core.setFailed(error.message);
}
