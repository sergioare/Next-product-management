import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import { Button } from '@mui/material'

export const metadata: Metadata = {
  title: "Login",
  description: "Login to get access to dashboard"
}

export default function Login() {

      return (
  <Button>Estamos en el login</Button>
  );
}
