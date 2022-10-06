
/**
 * Конвертирует размер из байтов
 * 
 * @param bytes 
 * @param decimals 
 * @returns string
 */
export default function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Байт";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Байт", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
