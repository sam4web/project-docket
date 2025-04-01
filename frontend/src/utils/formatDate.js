import dayjs from "dayjs";

const formatDate = (date) => {
  const dt = dayjs(date);
  return dt.format("MMM DD, YYYY");
};

export default formatDate;
