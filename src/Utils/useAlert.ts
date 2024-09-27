import Swal, { SweetAlertIcon } from "sweetalert2";

interface IProps {
  icon: SweetAlertIcon;
  title: string;
  text?: string;
  timer?: number;
  showButton?: boolean;
  isToast?: boolean;
  position?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
}

export const useAlert = ({ icon, title, text, ...rest }: IProps) => {
  if (rest.isToast && rest.position != undefined) {
    const SlideToast = Swal.mixin({
      timer: rest.timer || 3000,
      timerProgressBar: true,
      toast: rest.isToast || false,
      position: rest.position || undefined,
      showConfirmButton: rest.showButton || false,
    });
    SlideToast.fire({
      icon: icon,
      title: title,
      text: text,
    });
  } else {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timerProgressBar: true,
      timer: rest.timer || 3000,
      showConfirmButton: rest.showButton || false,
    });
  }
};
