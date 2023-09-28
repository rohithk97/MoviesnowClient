import React, { useState } from "react";
import { DefaultTable } from "./table";
import { UserTable } from "./userstable";
import { BookingsTable } from "./bookingstable";
import { OwnersTable } from "./ownerstable";
import { MovieTable } from "./moviestable";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openBlank, setOpenBlank] = useState(true)
  const [openuser, setaOpenUser] = useState(false)
  const [opentheater, setOpentheater] = useState(false)
  const [openbookings, setOpenbookings] = useState(false)
  const [openowners, setOpenowners] = useState(false)
  const [openmovies, setOpenmovies] = useState(false)

  const handleUser = () => {
    setaOpenUser(true)
    setOpentheater(false)
    setOpenbookings(false)
    setOpenowners(false)
    setOpenmovies(false)
  }
  const handleTheater = () => {
    setOpentheater(true)
    setaOpenUser(false)
    setOpenbookings(false)
    setOpenowners(false)
    setOpenmovies(false)
  }

  const handleBookings = () =>{
    setOpenbookings(true)
    setOpentheater(false)
    setaOpenUser(false)
    setOpenowners(false)
    setOpenmovies(false)
  }
  const handleOwners = () =>{
    setOpenowners(true)
    setOpenbookings(false)
    setOpentheater(false)
    setaOpenUser(false)
    setOpenmovies(false)
    
  }
  const handleMovies = () =>{
    setOpenmovies(true)
    setOpenowners(false)
    setOpenbookings(false)
    setOpentheater(false)
    setaOpenUser(false)
    
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigateTo = useNavigate()
  return (
    <div className="flex ml-6 sticky top-0">
      <Card className="h-100 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gradient-to-r from-cyan-500 to-blue-500 ... ml-6">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img src="https://yt3.googleusercontent.com/ytc/AOPolaQRgYs5Pz3I4hMFPfHHgMA7sCYJBZKKEV---ZbRJQ=s900-c-k-c0x00ffffff-no-rj" alt="brand" className="h-8 w-8" />
          <Typography variant="h5" color="blue-gray">
            Movies Now
          </Typography>
        </div>
        <div className="p-2">
          <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
        </div>
        <List className="text-white">
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            {/* <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody> */}
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Buisiness
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0" >
                <ListItem onClick={handleUser}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Users
                </ListItem>
                <ListItem onClick={handleOwners}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Owners
                </ListItem>
                <ListItem onClick={handleTheater}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Theaters
                </ListItem>
                <ListItem onClick={handleBookings}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Bookings
                </ListItem>
                <ListItem onClick={handleMovies}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Movies
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          {/* <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem> */}
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          {/* <ListItem onClick={() => navigateTo("/")}>

            <span
              className="flex items-center cursor-pointer"

            >
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </span>
          </ListItem> */}
          <ListItem >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>

      </Card>
      <div className=" mt-4 ml-14 w-8/12">
      <div className="table-container" style={{ width: 'calc(100% )' }}>
        {/* <DefaultTable/> */}
        {openuser && <UserTable />}
        {opentheater && <DefaultTable />}
        {openbookings && <BookingsTable/>}
        {openowners && <OwnersTable/>}
        {openmovies && <MovieTable/>}
        </div>

      </div>
    </div>
  );
}
