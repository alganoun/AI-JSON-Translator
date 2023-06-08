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
    prompt: `Translate the values of the following JSON object from English to ${process.en.TRANSLATED_LANGUAGE}. Keep the keys in English and Output in JSON format: \n\n ${JSON.stringify(data)} \n\n`,
    temperature: 0.3,
    max_tokens:  4096,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  return response.data.choices[0].text;
}

export default async function jsonTranslator(toTranslate) {
  let result;
  let done = 0;
  while (done !== 1) {
    try {
      console.log(`Translating values of \x1b[34m'${JSON.stringify(toTranslate)}'\x1b[0m object...`)
      result = await translateAI(toTranslate);
      console.log("\x1b[32mDone.\x1b[0m\n")
      done = 1;
    }
    catch(error){
      errorMessageManager(error);
      done = 0;
    }
  }
  return result;
}
