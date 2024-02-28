"use client"
import { useState } from "react";
import styles from "./page.module.css";
import App from "@/components/App/App";

export default function Home() {
  return <main className={styles.main}>
    <App/>
  </main>;
}
