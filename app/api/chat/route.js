import { OpenAI } from 'openai';
import nc from 'next-connect';

const handler = nc()
  .use((req, res) => {
    if (req.method === 'POST') {
      return handlePostRequest(req, res);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  });

async function handlePostRequest(req, res) {
  try {
    // Check if the request body contains the query field
    if (!req.body.query) {
      return res.status(400).json({ error: 'Missing query in request body' });
    }

    // Initialize OpenAI client
    const client = new OpenAI({ base_url: "http://localhost:1234/v1", api_key: "lm-studio" });

    // Call the OpenAI API to generate chat completion
    const completion = await client.chat.completions.create({
      model: "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
      messages: [
        { role: "system", content: "Always answer in rhymes." },
        { role: "user", content: req.body.query }
      ],
      temperature: 0.7
    });

    // Send the completion as response
    return res.status(200).json(completion.choices[0].message);
  } catch (error) {
    console.error('Error:', error);
    // Log additional error details
    console.error('Error message:', error.message);
    console.error('Error stack trace:', error.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default handler;