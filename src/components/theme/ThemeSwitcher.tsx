
import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import clsx from 'clsx'

type Theme = 'light' | 'dark' | 'system'
// const root = document.querySelector("#root");
const html = window.document.documentElement
const root = html.querySelector("#root");
export default function ThemeSwitcher({ text = "" , sidebar = false}: { text?: string, sidebar?: boolean }) {
   const [theme, setTheme] = useState<Theme>('system')
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme) {
         setTheme(savedTheme)
         applyTheme(savedTheme)
      } else {
         applyTheme('system')
      }
   }, [])

   useEffect(() => {
      if (mounted) {
         root?.classList.add('theme-transition')
         localStorage.setItem('theme', theme)
         applyTheme(theme)
      }
   }, [theme, mounted])

   const applyTheme = (newTheme: Theme) => {
      root?.classList.remove('light', 'dark')
      html.classList.remove('light', 'dark')
      
      if (newTheme === 'system') {
         const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
         html?.classList.add(systemTheme)
         root?.classList.add(systemTheme)
      } else {
         html?.classList.add(newTheme)
         root?.classList.add(newTheme)
      }
   }

   const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme)
   }

   if (!mounted) {
      return null
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" aria-label="Select theme" className={clsx("hover:text-sidebar-accent-foreground text-sidebar-foreground flex  hover:!bg-transparent !rounded-[2px] ",sidebar?"p-0":"px-[10px] !mr-2")} >
               {theme === 'light' && <Sun  className='size-5 group-data-[collapsible=icon]:size-6'/>}
               {theme === 'dark' && <Moon  className='size-5 group-data-[collapsible=icon]:size-6'/>}
               {theme === 'system' && <Monitor className='size-5 group-data-[collapsible=icon]:size-6' />}
               <span className={`ont-normal group-data-[collapsible=icon]:hidden ${text&&"ml-2"}`}>
                  {text}
               </span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center" className={clsx(sidebar&&"bg-sidebar",`dark:bg-gray-800 z-[9999999]`)} >
            <DropdownMenuItem onClick={() => handleThemeChange('light')} className={clsx(sidebar?"hover:!bg-sidebar-accent":"dark:hover:!bg-purple-500")}>
               <Sun className="mr-2  h-4 w-4 " />
               <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange('dark')} className={clsx(sidebar?"hover:!bg-sidebar-accent":"dark:hover:!bg-purple-500")}>
               <Moon className="mr-2 h-4 w-4 " />
               <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange('system')} className={clsx(sidebar?"hover:!bg-sidebar-accent":"dark:hover:!bg-purple-500")}>
               <Monitor className="mr-2 h-4 w-4 " />
               <span>System</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}