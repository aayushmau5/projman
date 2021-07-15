import { resetConfigPrompt } from "../utils/prompts";
import { resetConfigFile } from "../utils/manageConfig";

export default async function resetConfig() {
  const answer = await resetConfigPrompt();
  if (!answer.remove) {
    return;
  }
  resetConfigFile();
  console.log("projman config file reset.");
}
