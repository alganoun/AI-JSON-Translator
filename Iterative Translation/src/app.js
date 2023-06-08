import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import errorMessageManager from "./errors.js";
config();

async function translateAI(data) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Translate this value from English to ${process.env.TRANSLATED_LANGUAGE}: \n\n ${data} \n\n`,
    temperature: 0.3,
    max_tokens:  100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  return response.data.choices[0].text;
}

export default async function jsonTranslator (toTranslate) {
  let result = {};
  let index = 0;
  let tab = Object.entries(toTranslate);
  while (index <  tab.length) {
    try {
      console.log(`On the \x1b[34m'${tab[index][0]}'\x1b[0m key`)
      result[tab[index][0]] = await translateAI(tab[index][1]);
      console.log("\x1b[32mDone.\x1b[0m\n")
    }
    catch (error) {
      errorMessageManager(error);
      if (index > 0) index--;
      else index = -1;
    }
    index++;
  }
  return result;
}
