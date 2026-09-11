"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); 
      const year = now.getFullYear();
      
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      const formattedHours = String(hours).padStart(2, '0');
      
      setTimeStr(`${day}/${month}/${year} ${formattedHours}:${minutes}${ampm} PT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second to match original
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="main-header" className="center-header">
      <h1 className="box-logo">
        <Link href="/">
          <em>Bernardomaia</em>
        </Link>
      </h1>
      <div className="clock" style={{ visibility: timeStr ? "visible" : "hidden" }}>
        {timeStr || "00/00/0000 00:00am PT"}
      </div>
    </header>
  );
}
