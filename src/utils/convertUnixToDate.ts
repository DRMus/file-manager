import moment from "moment";

const convertUnixToDate = (unixTime: number) => {
  const date = new Date(unixTime)
  return moment(date).format("DD.MM.yy");
}

export default convertUnixToDate