import Swal, { SweetAlertIcon } from "sweetalert2";

interface IProps {
  icon: SweetAlertIcon;
  title: string;
  text?: string;
  timer?: number;
  showButton?: boolean;
}

export const useAlert = ({ icon, title, text, ...rest }: IProps) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: rest.timer,
    showConfirmButton: rest.showButton || false,
    timerProgressBar: true,
  });
};
