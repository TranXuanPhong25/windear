import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {AnalyticStat} from "@/models/AnalyticStat.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function replaceUnderscores(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(replaceUnderscores);
    }

    return Object.keys(obj).reduce((acc: Record<string, unknown>, key) => {
        const newKey = key.replace(/_/g, ' ');
        acc[newKey] = replaceUnderscores((obj as Record<string, unknown>)[key]);
        return acc;
    }, {} as Record<string, unknown>);
}

export function flattenObject(ob: Record<string, unknown>): Record<string, string | number | boolean> {
    const toReturn: Record<string, string | number | boolean> = {};

    for (const i in ob) {
        if (!Object.prototype.hasOwnProperty.call(ob, i)) continue;

        if ((typeof ob[i]) === 'object' && ob[i] !== null) {
            const flatObject = flattenObject(ob[i] as Record<string, unknown>);
            for (const x in flatObject) {
                if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue;

                toReturn[i + '_' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i] as string | number | boolean;
        }
    }
    return toReturn;
}

export function handlePlural(value: number, unit: string, shouldTruncate: boolean = false): string {
    unit = " " + unit;
    if (value > 1 && unit != " ") {
        unit += "s";
    }

    if (shouldTruncate && value > 1000) {
        value = Math.floor(value / 1000);
        unit = "K" + unit;
    } else {
        const formattedNumber = new Intl.NumberFormat('en-US').format(value);
        return `${formattedNumber}${unit}`;
    }

    return `${value}${unit}`;
}

export function parseLinks(text: string) {
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(`<a href="${match[1]}" class="text-blue-500 dark:text-blue-400 hover:underline">${match[2]}</a>`);
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts.join('');
}

export function calculateLastLoginTime(lastLogin: string | number): string {
    const lastLoginDate = new Date(lastLogin);
    const currentDate = new Date();
    const diff = currentDate.getTime() - lastLoginDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    if (diffInDays < 1) {
        const diffInHours = diff / (1000 * 3600);
        if (diffInHours < 1) {
            const diffInMinutes = diff / (1000 * 60);
            if (diffInMinutes < 1) {
                return "Just now";
            } else {
                return `${Math.floor(diffInMinutes)} minutes ago`;
            }
        } else {
            return `${Math.floor(diffInHours)} hours ago`;
        }
    } else if (diffInDays < 2) {
        return "Yesterday";
    } else {
        return `${Math.floor(diffInDays)} days ago`;
    }
}

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export function boundInMonthData(data: AnalyticStat[]) {
    if(new Date(data[data.length-1].time).getTime() < new Date().getTime() && new Date(data[data.length-1].time).getDay()<new Date().getDay() ) {
        data.push(
            {
                value: "0",
                time: new Date().toDateString()
            }
        )
    }

    if (new Date(data[0].time).getTime() + ONE_MONTH > new Date(data[data.length - 1].time).getTime()) {
        data.unshift(
            {
                value: "0",
                time: new Date(new Date(data[data.length - 1].time).getTime() - ONE_MONTH).toDateString()
            }
        )

    }


    return data;
}
export function fillAnalyticArray(data: AnalyticStat[]) {
    const filledData: AnalyticStat[] = [];
    for (let i = 0; i < data.length - 1; i++) {
        let diff = new Date(data[i + 1].time).getTime() - new Date(data[i].time).getTime();
        filledData.push({
            value: data[i].value,
            time:  new Date(data[i].time).toDateString().slice(0,-4)
        });

        while (diff > ONE_DAY) {
            diff -= ONE_DAY;
            filledData.push({
                value: "0",
                time: new Date(new Date(data[i + 1].time).getTime() - diff).toDateString().slice(0,-4)
            });
        }
    }
    filledData.push({
        value: data[data.length - 1].value,
        time: new Date(data[data.length - 1].time).toDateString().slice(0,-4)
    });
    return filledData;
}