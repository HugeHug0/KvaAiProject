export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const GAS_URL = process.env.GAS_URL;

    if (!GAS_URL) {
      throw new Error('GAS_URL не задан');
    }

    const payload = request.body;

    const gasResponse = await fetch(GAS_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (!gasResponse.ok) {
      throw new Error(`GAS вернул статус ${gasResponse.status}`);
    }

    return response.status(200).json({ success: true });

  } catch (error) {
    return response.status(500).json({
      error: error.message
    });
  }
}