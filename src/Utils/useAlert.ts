import Swal, { SweetAlertIcon } from "sweetalert2";

interface IProps {
  icon: SweetAlertIcon;
  title: string;
  text: string;
}

export const useAlert = ({ icon, title, text }: IProps) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};
