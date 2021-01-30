import Link from "next/link";

//import style from "./NavButton.scss";

const NavButton = props => (
  <Link href={props.path}>
    <div className="NavButton">
      <div className="Icon">{props.icon}</div>
      <span className="Label">{props.label}</span>
    </div>
  </Link>
);

export default NavButton;