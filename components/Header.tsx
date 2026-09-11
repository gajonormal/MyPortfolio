"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      let formatter = new Intl.DateTimeFormat("en-GB", options);
      let formattedParts = formatter.formatToParts(now);

      let datePart = "";
      let timePart = "";
      let ampm = "";

      formattedParts.forEach((part) => {
        if (part.type === "day" || part.type === "month" || part.type === "year" || part.type === "literal") {
          if (part.type === "literal" && part.value === ", ") {
            // ignore
          } else {
            datePart += part.value;
          }
        }
        if (part.type === "hour" || part.type === "minute") {
          timePart += part.value;
        }
        if (part.type === "literal" && part.value === ":") {
          timePart += ":";
        }
        if (part.type === "dayPeriod") {
          ampm = part.value.toLowerCase();
        }
      });

      setTimeStr(`${datePart.trim()} ${timePart}${ampm} PT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
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
