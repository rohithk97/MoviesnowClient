import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  
} from "@heroicons/react/24/outline";
 
const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};
 
const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "About us",
    description: "Learn about our story and our mission statement.",
  },
  {
    color: "orange",
    icon: ChatBubbleOvalLeftIcon,
    title: "My Theaters",
    description: "News and writings, press releases, and resources",
  },
  {
    color: "green",
    icon: UsersIcon,
    title: (
      <div className="flex items-center gap-1">
        News{""}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="Movie news!"
          className="capitalize"
        />
      </div>
    ),
    description: "click on to know about latest film updates!",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Legal",
    description: "All the stuff that we dan from legal made us add.",
  }, 
];
 
function NavListMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color, path }, key) => (
      <MenuItem
        className="flex items-center gap-3 rounded-lg"
        key={key}
        onClick={() => {
          if (typeof title === "string" && title === "My Theaters") {
            navigate("/owner");
          }
          if ( icon === UsersIcon) {
            navigate("/news");
          }
        }}
      >
        <div className={`rounded-lg p-5 ${colors[color]}`}>
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 w-6",
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm"
          >
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {description}
          </Typography>
        </div>
      </MenuItem>
    )
  );
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Options
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
function NavList() {
  const navigate = useNavigate();
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">

          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          Tickets
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4"
        onClick={() => navigate('/profile')}
        >
          <UserCircleIcon className="h-[18px] w-[18px]" />
          Account
        </ListItem>
      </Typography>
    </List>
  );
}


 
export function NavbarWithMegaMenu() {
  const token = localStorage.getItem('accessToken') || '';
   // Retrieve token from localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user,'hvjbknjlhjbhvcghvjbk');
   const navigate = useNavigate();
  
  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAdmin = user?.Admin ;

  console.log(user?.Admin,'pppppppppppp');
  
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          onClick={() => navigate("/")}
        >
          Movies Now
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        {!token ? (
          <div className="hidden gap-2 lg:flex">
            <Button
              onClick={() => navigate('/login')}
              variant="text"
              size="sm"
              color="blue-gray"
            >
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')} variant="gradient" size="sm">
              Sign Up
            </Button>
          </div>
        ) : (
          <>
            {isAdmin === 'True' && ( // Conditionally render for admin or superuser
              <Button
                onClick={() => navigate('/admin')} // Adjust the route as needed
                variant="gradient"
                size="sm"
              >
                Dashboard
              </Button>
            )}
            <Button onClick={logOut} variant="gradient" size="sm">
              Sign Out
            </Button>
          </>
        )}
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Sign In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign Up
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
export default NavbarWithMegaMenu;