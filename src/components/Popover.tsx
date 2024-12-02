import * as React from "react";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import { Fade, Paper } from "@mui/material";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";

interface PopperProps {
  position: PopperPlacementType;
  buttonText?: string;
  popperContent: React.ReactNode;
}

const PopperOver: React.FC<PopperProps> = ({
  buttonText,
  popperContent,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (anchorEl && !anchorEl.contains(event.target as Node)) {
      setAnchorEl(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        {buttonText ? (
          buttonText
        ) : (
          <IoEllipsisHorizontalCircleOutline size={26} />
        )}
      </button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={rest.position}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>{popperContent}</Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default PopperOver;
