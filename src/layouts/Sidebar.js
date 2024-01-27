import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Services",
    href: "/services",
    icon: "bi bi-bell",
  },
  {
    title: "Industries",
    href: "/industries",
    icon: "bi bi-patch-check",
  },
  // {
  //   title: "Buttons",
  //   href: "/buttons",
  //   icon: "bi bi-hdd-stack",
  // },
  {
    title: "Products",
    href: "/products",
    icon: "bi bi-card-text",
  },
  {
    title: "Team",
    href: "/team",
    icon: "bi bi-columns",
  },
  // {
  //   title: "Table",
  //   href: "/table",
  //   icon: "bi bi-layout-split",
  // },
  // {
  //   title: "Forms",
  //   href: "/forms",
  //   icon: "bi bi-textarea-resize",
  // },
  {
    title: "Clients",
    href: "/ourClintes",
    icon: "bi bi-link",
  },
  {
    title: "Messages",
    href: "/messages",
    icon: "bi bi-layout-split",
  },
  {
    title: "Login",
    href: "/login",
    icon: "bi bi-link",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center text-decoration-none">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-2 mt-2 ">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}

        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
