import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Award, BadgeCheck, ChevronDown, Compass, Dna, LibraryBig, Telescope, TrendingUp, UserRoundPen } from "lucide-react";
import { Link } from "react-router-dom";
const discoverNavigation = [
  {name:"New Releases",href:"/new-releases",description:"Latest books",icon:BadgeCheck},
  {name:"Trending",href:"/popular",description:"Most popular right now",icon:TrendingUp},
  {name:"Recommendation",href:"recommendations",description:"Just for you",icon:Award},
];
const browseNavigation = [
  { name: "All books", href: "/browse/books", description: "Browse all books", icon: LibraryBig },
  { name: "Authors", href: "/browse/authors", description: "Browse by authors", icon: UserRoundPen },
  { name: "Genres", href: "/browse/genres", description: "Browse by genres", icon: Dna },
];
const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className="relative z-10 flex justify-center items-center ">
      <NavigationMenu.List className="center m-0 flex list-none rounded-md p-1 gap-2  ">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded-md px-3 py-2 text-[15px] text-white font-medium leading-none  outline-none  focus:shadow-[0_0_0_2px] bg-gray-900/50 hover:bg-gray-900  ">
            <Telescope className=" mr-1 size-5"/>
            Discover{" "}
            <ChevronDown
              className="relative top-px  transition-transform duration-[150] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
            <ul className="one m-0  list-none  sm:w-[500px] bg-gray-800 pb-2 pt-1 px-2">
              {discoverNavigation.map((item) => (
                <li key={item.name} className="w-full group p-1">
                  <NavigationMenu.Link asChild>
                    <Link to={item.href}>
                      <div className="flex items-center gap-2.5">
                        <item.icon className="w-10 h-10 text-purple-400 bg-gray-900/45 group-hover:bg-purple-500 group-hover:text-white p-2 rounded-md" />
                        <div>
                          <h3 className="text-md  text-white ">{item.name}</h3>
                          <p className="text-gray-400 font-sans font-semibold group-hover:text-gray-200">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded-md px-3 py-2 text-[15px] text-white font-medium leading-none  outline-none  focus:shadow-[0_0_0_2px] bg-gray-900/50 hover:bg-gray-900 ">
              <Compass className="mr-1 size-5"/>
            Browse{" "}
            <ChevronDown
              className="relative top-px transition-transform duration-[150] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
            <ul className="one m-0  list-none  sm:w-[500px] bg-gray-800 pb-2 pt-1 px-2">
              {browseNavigation.map((item) => (
                <li key={item.name} className="w-full group p-1">
                  <NavigationMenu.Link asChild>
                    <Link to={item.href} >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="size-10 text-purple-400 bg-gray-900/45 group-hover:bg-purple-500 group-hover:text-white p-2 rounded-md" />
                        <div>
                          <h3 className="text-md  text-white">{item.name}</h3>
                          <p className="text-gray-400  font-sans font-semibold group-hover:text-gray-200">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>


        <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
          <div className="relative top-[60%] size-3 rotate-45 rounded-tl-md bg-gray-600" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>



      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center ">
        <NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-xl  bg-gray-800 transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)] border-2 border-gray-600" />

      </div>
    </NavigationMenu.Root>
  );
};

export default NavigationMenuDemo;
