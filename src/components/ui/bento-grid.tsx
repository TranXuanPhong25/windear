import {ReactNode} from "react";
import {ChevronRight, LucideIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

const BentoGrid = ({
                       children,
                       className,
                   }: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] lg:grid-cols-5 gap-4 ",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
                       name,
                       className,
                       background,
                       Icon,
                       description,
                       href,
                       cta,
                   }: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: LucideIcon;
    description: string;
    href: string;
    cta: string;
}) => (
    <Link to={href}
        key={name}
        className={cn(
            "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
            // light styles
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            // dark styles
            "transform-gpu dark:bg-slate-600 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            className,
        )}
    >
        <div>{background}</div>
        <div
            className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <div
                className="!size-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75">
                <Icon className="size-12 dark:text-white"/>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                {name}
            </h3>
            <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div
            className={cn(
                "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
        >
            <Button variant="ghost" asChild size="sm" className="pointer-events-auto hover:dark:bg-gray-700">
                <Link to={href}>
                    {cta}
                    <ChevronRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
        </div>
        <div
            className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"/>
    </Link>
);

export {BentoCard, BentoGrid};
