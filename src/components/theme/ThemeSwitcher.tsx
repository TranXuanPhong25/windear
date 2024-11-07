
import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeSwitcher({ text = "" }: { text?: string }) {
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
         localStorage.setItem('theme', theme)
         applyTheme(theme)
      }
   }, [theme, mounted])

   const applyTheme = (newTheme: Theme) => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')

      if (newTheme === 'system') {
         const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
         root.classList.add(systemTheme)
      } else {
         root.classList.add(newTheme)
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
            <Button variant="ghost" aria-label="Select theme" className="p-0  hover:text-sidebar-accent-foreground text-sidebar-foreground">
               {theme === 'light' && <Sun  className='size-5 group-data-[collapsible=icon]:size-6'/>}
               {theme === 'dark' && <Moon  className='size-5 group-data-[collapsible=icon]:size-6'/>}
               {theme === 'system' && <Monitor className='size-5 group-data-[collapsible=icon]:size-6' />}
               <span className='ml-2 font-normal group-data-[collapsible=icon]:hidden '>
                  {text}
               </span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" >
            <DropdownMenuItem onClick={() => handleThemeChange('light')}>
               <Sun className="mr-2  h-4 w-4" />
               <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
               <Moon className="mr-2 h-4 w-4" />
               <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange('system')}>
               <Monitor className="mr-2 h-4 w-4" />
               <span>System</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}