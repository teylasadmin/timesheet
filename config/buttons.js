import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faWrench,
  faMapMarkerAlt,
  faUser,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    label: "Settings",
    path: "/settings",
    icon: <FontAwesomeIcon icon={faWrench} />
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />
  }
];

export default navButtons;