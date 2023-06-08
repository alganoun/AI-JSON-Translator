export default function errorMessageManager(error) {
  console.log('\x1b[31mError detected during translation process.\x1b[34m');
  if (error.toString().includes("429"))
  console.log('\x1b[31mOpenAI API cant process your request for now. This may be caused by the API being at capacity.\x1b[34m')
  console.log('\n\x1b[35mRetrying...\x1b[34m\n');
}
