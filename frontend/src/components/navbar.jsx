import React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { House, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ui/theme-toggle";

const navLinks = [
    { name: "Home", href: "/", icon: <House className="h-4 w-4" /> },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

// These are the paths on which the navbar is hidden
const hiddenPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email/:token",
    "/error",
];

export const Navbar = () => {
    const location = useLocation();
    return (
        <div
            className={
                hiddenPaths.includes(location.pathname)
                    ? "hidden"
                    : "w-full fixed top-0 z-50 bg-background/60 backdrop-blur-sm"
            }
        >
            <div className="container flex flex-row justify-between items-center py-5 mx-auto px-4">
                <NavLink
                    to="/"
                    className="font-extrabold text-lg uppercase text-primary-accent"
                >
                    محفل
                </NavLink>
                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="flex gap-5">
                        {navLinks.map((link) => (
                            <NavigationMenuItem key={link.name}>
                                <NavLink
                                    to={link.href}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "after:content-[''] after:h-0.5 after:w-full after:transition-all after:duration-300 after:absolute after:bottom-0 after:left-0 navbar_link after:bg-primary"
                                            : "navbar_link"
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <NavLink
                                to="/login"
                                className={
                                    location.pathname === "/login"
                                        ? "hidden"
                                        : ""
                                }
                            >
                                <Button variant="secondary">Log in</Button>
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <ThemeToggle />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex flex-row gap-3">
                    <ThemeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="shadow-primary shadow-xl"
                                size="icon"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-60">
                            <SheetTitle className="hidden"></SheetTitle>
                            <SheetDescription className="hidden"></SheetDescription>
                            <nav
                                className="flex flex-col gap-1 mt-9"
                                key={location.pathname}
                            >
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.name}>
                                        <NavLink
                                            key={link.name}
                                            to={link.href}
                                            className={
                                                link.href === location.pathname
                                                    ? "font-medium py-2 px-3 text-lg transition-colors bg-accent flex flex-row gap-2 items-center"
                                                    : "font-medium py-2 px-3 text-lg transition-colors hover:bg-accent active:bg-accent flex flex-row gap-2 items-center"
                                            }
                                        >
                                            {link.icon || link.icon}
                                            <div>{link.name}</div>
                                        </NavLink>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};
