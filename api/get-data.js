export default async function handler(request, response) {
  // Проверяем, что пришел именно POST-запрос
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Получаем секретный URL из переменных окружения Vercel
    const GAS_URL = process.env.GAS_URL; 
    
    // Данные, которые пришли из index.html
    const payload = request.body; 

    // Отправляем запрос от имени сервера Vercel на Google Apps Script
    await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    // Возвращаем фронтенду успешный статус
    return response.status(200).json({ success: true });
  } catch (error) {
    // Если что-то пошло не так, возвращаем ошибку
    return response.status(500).json({ error: error.message });
  }
}
