import * as React from "react";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import { Fade, Paper } from "@mui/material";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";

interface PopperProps {
  position: PopperPlacementType;
  buttonText?: string;
  clipping?: boolean;
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
    <div className="z-10">
      <button aria-describedby={id} type="button" onClick={handleClick}>
        {buttonText ? (
          buttonText
        ) : (
          <IoEllipsisHorizontalCircleOutline
            size={26}
            className="text-neu-600"
          />
        )}
      </button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={rest.position}
        transition
        container={document.body}
        disablePortal={rest.clipping}
        modifiers={[
          {
            name: "zIndex",
            enabled: true,
            options: {
              zIndex: 1300,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={3}
              sx={{
                zIndex: 1300,
                overflow: "visible",
              }}
            >
              {popperContent}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default PopperOver;
