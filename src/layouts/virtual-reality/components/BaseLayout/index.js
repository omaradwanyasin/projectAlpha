import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSoftUIController, setMiniSidenav, setLayout, setTransparentSidenav } from "context";

// Custom styles for the BaseLayout
import { baseLayout } from "layouts/virtual-reality/components/BaseLayout/styles";

function BaseLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the document layout to VR for the VR view
  useEffect(() => {
    setLayout(dispatch, "vr");
    setTransparentSidenav(dispatch, false);
  }, [pathname]);

  return (
    <SoftBox sx={baseLayout}>
      <SoftBox mt={3} mx={3}>
        <DashboardNavbar />
      </SoftBox>
      <SoftBox pb={2} pt={0.25}>
        {children}
      </SoftBox>
    </SoftBox>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
