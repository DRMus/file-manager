import moment from "moment";

/**
 * Конвертирует Unix код в строковое представление даты
 * 
 * @param unixTime 
 * @returns string
 */
const convertUnixToDate = (unixTime: number) => {
  const date = new Date(unixTime)
  return moment(date).format("DD.MM.yy");
}

export default convertUnixToDate