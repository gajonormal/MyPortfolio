"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Lisbon",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formatter = new Intl.DateTimeFormat("en-GB", options);
      const parts = formatter.formatToParts(new Date());

      let dp = "";
      let tp = "";
      let am = "";

      parts.forEach((p) => {
        if (["day", "month", "year"].includes(p.type)) dp += p.value;
        else if (p.type === "literal") {
          if (p.value === "/") dp += "/";
          if (p.value === ":") tp += ":";
        }
        if (["hour", "minute"].includes(p.type)) tp += p.value;
        if (p.type === "dayPeriod") am = p.value.toLowerCase();
      });

      setTimeStr(`${dp} ${tp}${am} PT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second
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
