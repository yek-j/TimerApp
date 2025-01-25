'use client'

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function LayoutWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div className={`
            ${isOpen ? 'block' : 'hidden'}
            md:block
            w-64
            min-h-screen
            border-r border-gray-200
        `}>
        <Sidebar />
      </div>
      <div className="flex-1 relative">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute top-6 left-6 z-[100] p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            {isOpen
                ? <XMarkIcon className="h-6 w-6" />
                : <Bars3Icon className="h-6 w-6" />
            }
        </button>
        <div className="pt-20 md:pt-0"> 
          {children}
        </div>
      </div>
    </div>
  )
}