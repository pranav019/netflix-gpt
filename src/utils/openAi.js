import OpenAI from "openai";
import { openAI_key } from "./constants";

const openai = new OpenAI({
  apiKey: openAI_key, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export default openai;
