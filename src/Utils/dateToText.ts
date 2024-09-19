import moment from "moment";

interface IProps {
  date: string | Date;
}

export const useFormatDate = ({ date }: IProps) => {
  return moment(date).format("Do MMM., YYYY - h:mm A");
};
