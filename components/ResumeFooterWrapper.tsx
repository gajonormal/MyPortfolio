"use client";

import { useState } from "react";
import GlobalFooter from "@/components/GlobalFooter";
import ResumeModal from "@/components/ResumeModal";

export default function ResumeFooterWrapper() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <GlobalFooter activePage="sobre" onOpenResume={() => setIsResumeOpen(true)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
