import * as core from "@actions/core";
import * as github from "@actions/github";

try {
  if (github.context.eventName !== "pull_request") {
    throw new Error("This action must be triggered by `pull_request` event.");
  }

  if (github.context.payload.pull_request === undefined) {
    throw new Error(
      "The requested payload seems NOT to be one of the Pull Request API."
    );
  }

  core.info(github.context.payload.pull_request.body ?? "");
} catch (error) {
  core.setFailed(error.message);
}
