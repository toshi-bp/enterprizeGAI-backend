import {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

import { createPortal } from "react-dom";

type DrawerProps = {
  overlayColor?: string;
  placement?: "Left" | "Right" | "Top" | "Bottom";
  onOutsideClick?: () => void;
  zIndex?: number;
  children: ReactNode;
};

const PortalDrawer: FunctionComponent<DrawerProps> = ({
  children,
  overlayColor,
  placement = "Left",
  onOutsideClick,
  zIndex = 100,
}) => {
  const drawerStyle = useMemo(() => {
    const style: CSSProperties = {};
    style.zIndex = zIndex;

    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }

    switch (placement) {
      case "Left":
        style.alignItems = "flex-start";
        break;
      case "Right":
        style.alignItems = "flex-end";
        break;
      case "Top":
        style.alignItems = "center";
        break;
      case "Bottom":
        style.alignItems = "center";
        style.justifyContent = "flex-end";
        break;
    }

    return style;
  }, [placement, overlayColor, zIndex]);

  const onOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        onOutsideClick &&
        (e.target as HTMLElement).classList.contains("portalPopupOverlay")
      ) {
        onOutsideClick();
      }
      e.stopPropagation();
    },
    [onOutsideClick]
  );

  return (
    <DrawerContainer>
      <div
        className="flex flex-col fixed inset-0 portalPopupOverlay"
        style={drawerStyle}
        onClick={onOverlayClick}
      >
        {children}
      </div>
    </DrawerContainer>
  );
};

type DrawerContainerProps = {
  children: ReactNode;
  containerId?: string;
};

export const DrawerContainer: FunctionComponent<DrawerContainerProps> = ({
  children,
  containerId = "portals",
}) => {
  let portalsDiv = document.getElementById(containerId);
  if (!portalsDiv) {
    portalsDiv = document.createElement("div");
    portalsDiv.setAttribute("id", containerId);
    document.body.appendChild(portalsDiv);
  }

  return createPortal(children, portalsDiv);
};
export default PortalDrawer;
