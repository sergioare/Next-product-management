"use client";
import { Box, Typography } from "@mui/material";
import logo from "../../../public/brand.webp";
import Image from "next/image";
import { getFromLocalStorage } from "@/app/_Utilities/localStorage";
import { useEffect, useState } from "react";
import { UserCredential } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState<UserCredential | null>(null);
  useEffect(() => {
    const localUser = getFromLocalStorage('user');
    console.log(localUser)
    setUser(localUser);
  }, []);
  return (
    <Box
      sx={{
        margin: {xs:"5px 10px", md:"5px 20px 10px 20px"},
        borderBottom: { xs: "1px solid grey", md: "none" },
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}
    >
      <Image
        src={logo}
        alt="Brand Logo"
        width={170}
        height={50}
        priority={true}
      />
      {user && <Typography variant="h4" sx={{fontSize:{xs:14, md:20 }, textAlign:"right"}}>Administrador {user.user.displayName || user.user.email}</Typography>}
    </Box>
  );
};

export default Navbar;
