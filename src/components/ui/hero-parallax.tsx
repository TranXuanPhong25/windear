import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import {Link} from "react-router-dom";
import {PopularBookOnGoodreads} from "@/models/PopularBookOnGoodreads.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const HeroParallax = ({
                          products, isLoading
                      }: {
    products: PopularBookOnGoodreads[];
    isLoading: boolean;
}) => {
    const firstRow: PopularBookOnGoodreads[] = products && products.slice(0, 10);
    const secondRow: PopularBookOnGoodreads[] = products && products.slice(10, 20);
    const thirdRow: PopularBookOnGoodreads[] = products && products.slice(20, 30);
    console.log(products);
    const ref = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = {stiffness: 300, damping: 30, bounce: 100};

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 2000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -2300]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [25, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-950, 200]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header/>
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                {
                    !products || isLoading ?
                        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 ">
                            {
                                [null, null, null, null, null, null, null, null, null, null].map((_, index) => (
                                    <motion.div
                                        style={{
                                            x: translateX,
                                        }}
                                        whileHover={{
                                            y: -20,
                                        }}
                                        key={index}
                                        className="group/product h-[390px] w-64 relative flex-shrink-0 rounded-r-2xl rounded-l-md overflow-hidden "
                                    >
                                        <Skeleton
                                            className="block group-hover/product:shadow-2xl w-full bg-gray-400 absolute h-[390px]">
                                        </Skeleton>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                        : <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 ">
                            {firstRow.map((product) => (
                                <ProductCard
                                    product={product}
                                    translate={translateX}
                                    key={product.node.title+product.node.topic}
                                />
                            ))}
                        </motion.div>
                }

                {
                    !products || isLoading ?
                        <motion.div className="flex flex-row  mb-20 space-x-20  ">
                            {
                                [null, null, null, null, null, null, null, null, null, null].map((_, index) => (
                                    <motion.div
                                        style={{
                                            x: translateXReverse,
                                        }}
                                        whileHover={{
                                            y: -20,
                                        }}
                                        key={index}
                                        className="group/product h-[390px] w-64 relative flex-shrink-0 rounded-r-2xl rounded-l-md overflow-hidden "
                                    >
                                        <div
                                            className={"animate-pulse h-[390px] w-[30rem] bg-gray-400 rounded-r-2xl rounded-l-md overflow-hidden"}>

                                            <Skeleton
                                                className="block group-hover/product:shadow-2xl w-full bg-gray-400 absolute h-[390px">
                                            </Skeleton>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                        : <motion.div className="flex flex-row  mb-20 space-x-20  ">
                            {secondRow.map((product) => (
                                isLoading ? <div
                                        className="animate-pulse h-[340px] w-[30rem] bg-gray-400 rrounded-r-2xl rounded-l-md overflow-hidden"></div> :
                                    <ProductCard
                                        product={product}
                                        translate={translateXReverse}
                                        key={product.node.title+product.node.topic}
                                    />
                            ))}
                        </motion.div>
                }
                {
                    !products || isLoading ?
                        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 ">
                            {
                                [null, null, null, null, null, null, null, null, null, null].map((_, index) => (
                                    <motion.div
                                        style={{
                                            x: translateX,
                                        }}
                                        whileHover={{
                                            y: -20,
                                        }}
                                        key={index}
                                        className="group/product h-[390px] w-64 relative flex-shrink-0 rounded-r-2xl rounded-l-md overflow-hidden "
                                    >
                                        <Skeleton
                                            className="block group-hover/product:shadow-2xl w-full bg-gray-400 absolute h-[390px]">
                                        </Skeleton>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                        : <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 ">
                            {thirdRow.map((product) => (
                                isLoading ? <div
                                        className="animate-pulse h-[340px] w-[30rem] bg-gray-400 rounded-r-2xl rounded-l-md overflow-hidden"></div> :
                                    <ProductCard
                                        product={product}
                                        translate={translateX}
                                        key={product.node.title+product.node.topic}
                                    />
                            ))}
                        </motion.div>
                }
            </motion.div>
        </div>
    )
        ;
};

export default HeroParallax;

export const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
            <h1 className="text-4xl md:text-8xl font-bold dark:text-white ">
                The wonderful <br/> Library on the world
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
                Windear Library pioneers with the mission of promoting a reading culture and delivering boundless
                knowledge to everyone, regardless of age, contributing to the development and enhancement of Vietnam's
                education system.
            </p>
        </div>
    );
};

export const ProductCard = ({
                                product,
                                translate,
                            }: {
    product: PopularBookOnGoodreads;
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.node.title}
            className="group/product h-[390px] w-64 relative flex-shrink-0 rounded-r-2xl rounded-l-md overflow-hidden border-4 border-slate-500 "
        >
            <Link
                to={"/books/" + product.node.legacyId}
                className=" block group-hover/product:shadow-2xl w-full bg-slate-500 absolute h-full">
                <img
                    src={product.node.imageUrl}
                    className="object-cover  object-left-top absolute inset-0 aspect-[256/390]"
                    alt={product.node.title}
                    loading="lazy"
                    decoding="async"

                />

            </Link>
            <div
                className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <div className="relative text-center opacity-0 group-hover/product:opacity-100 text-white text-2xl mt-6 font-bold">
                {product.node.topic}
            </div>
            <div className="relative text-center opacity-0 group-hover/product:opacity-100 text-white text-lg mt-10">
                {product.node.title}
            </div>
        </motion.div>
    );
};
