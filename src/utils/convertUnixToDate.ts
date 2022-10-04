import moment from "moment";

export default (unixTime: number) => {
  const date = new Date(unixTime)
  return moment(date).format("DD.MM.yy");
}