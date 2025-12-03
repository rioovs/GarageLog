"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const USFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className="h-4 w-6 mr-2"
  >
    <g fillRule="evenodd">
      <path fill="#bd3d44" d="M0 0h640v480H0" />
      <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
      <path fill="#192f5d" d="M0 0h296v258H0" />
      <marker id="us-a" markerHeight="30" markerWidth="30">
        <path fill="#fff" d="m14.7 18.4 6.6-20.4 6.5 20.4H7.2l19.8-14.4H2.4l19.8 14.4z" />
      </marker>
      <use width="30" height="30" x="19" y="22" href="#us-a" />
      <use width="30" height="30" x="66" y="22" href="#us-a" />
      <use width="30" height="30" x="114" y="22" href="#us-a" />
      <use width="30" height="30" x="161" y="22" href="#us-a" />
      <use width="30" height="30" x="209" y="22" href="#us-a" />
      <use width="30" height="30" x="256" y="22" href="#us-a" />
      <use width="30" height="30" x="42" y="59" href="#us-a" />
      <use width="30" height="30" x="90" y="59" href="#us-a" />
      <use width="30" height="30" x="137" y="59" href="#us-a" />
      <use width="30" height="30" x="185" y="59" href="#us-a" />
      <use width="30" height="30" x="232" y="59" href="#us-a" />
      <use width="30" height="30" x="19" y="96" href="#us-a" />
      <use width="30" height="30" x="66" y="96" href="#us-a" />
      <use width="30" height="30" x="114" y="96" href="#us-a" />
      <use width="30" height="30" x="161" y="96" href="#us-a" />
      <use width="30" height="30" x="209" y="96" href="#us-a" />
      <use width="30" height="30" x="256" y="96" href="#us-a" />
      <use width="30" height="30" x="42" y="133" href="#us-a" />
      <use width="30" height="30" x="90" y="133" href="#us-a" />
      <use width="30" height="30" x="137" y="133" href="#us-a" />
      <use width="30" height="30" x="185" y="133" href="#us-a" />
      <use width="30" height="30" x="232" y="133" href="#us-a" />
      <use width="30" height="30" x="19" y="171" href="#us-a" />
      <use width="30" height="30" x="66" y="171" href="#us-a" />
      <use width="30" height="30" x="114" y="171" href="#us-a" />
      <use width="30" height="30" x="161" y="171" href="#us-a" />
      <use width="30" height="30" x="209" y="171" href="#us-a" />
      <use width="30" height="30" x="256" y="171" href="#us-a" />
      <use width="30" height="30" x="42" y="208" href="#us-a" />
      <use width="30" height="30" x="90" y="208" href="#us-a" />
      <use width="30" height="30" x="137" y="208" href="#us-a" />
      <use width="30" height="30" x="185" y="208" href="#us-a" />
      <use width="30" height="30" x="232" y="208" href="#us-a" />
    </g>
  </svg>
)

const IDFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className="h-4 w-6 mr-2"
  >
    <g fillRule="evenodd">
      <path fill="#e70011" d="M0 0h640v240H0z" />
      <path fill="#fff" d="M0 240h640v240H0z" />
    </g>
  </svg>
)

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-12 px-0">
        {language === 'en' ? <USFlag /> : <IDFlag />}
        <span className="sr-only">Toggle language</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-12 px-0">
          {language === 'en' ? <USFlag /> : <IDFlag />}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <USFlag />
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('id')}>
          <IDFlag />
          Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
