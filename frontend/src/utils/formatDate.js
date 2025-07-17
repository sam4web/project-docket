import dayjs from "dayjs";

const formatDate = (date) => {
  if (!date) return null;
  const dt = dayjs(date);
  return dt.format("MMM DD, YYYY");
};

export default formatDate;
