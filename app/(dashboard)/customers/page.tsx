"use client";

import { usePathname } from "next/navigation";

import { PAGE_TITLES } from "@/constants/constants";

const Customers = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{PAGE_TITLES[pathname]}</h1>
      </div>
    </div>
  );
};

export default Customers;
