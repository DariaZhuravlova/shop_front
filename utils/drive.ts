/**
 * Преобразует ссылку Google Диска в прямую ссылку для встраивания.
 * @param {string} googleDriveUrl - Ссылка Google Диска для преобразования.
 * @returns {string} Прямая ссылка для встраивания.
 */
function getDirectLinkFromGoogleDriveUrl(googleDriveUrl) {
  // Регулярное выражение для извлечения идентификатора файла
  const regex = /\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/;
  const match = googleDriveUrl.match(regex);

  if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } else {
      throw new Error('Невалидная ссылка Google Диска');
  }
}

// Пример использования
const googleDriveUrl = 'https://drive.google.com/file/d/1dI4lv9x2J4Ksd2ds8Fs/view?usp=sharing';
const directLink = getDirectLinkFromGoogleDriveUrl(googleDriveUrl);

console.log(directLink); // Выведет: https://drive.google.com/uc?export=view&id=1dI4lv9x2J4Ksd2ds8Fs
