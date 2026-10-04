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
    const interval = setInterval(updateTime, 10000); // Update every 10 seconds (no need for 1s since we don't show seconds)
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="main-header" className="center-header">
      <h1 style={{ margin: 0, padding: 0 }}>
        <Link href="/" style={{ display: "inline-block" }}>
          <img src="/Logo.svg" alt="Bernardomaia" style={{ height: "45px", display: "block" }} />
        </Link>
      </h1>
      <div className="clock" style={{ visibility: timeStr ? "visible" : "hidden" }}>
        {timeStr || "00/00/0000 00:00am PT"}
      </div>
    </header>
  );
}
