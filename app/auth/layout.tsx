import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/ui/modeToggle";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full relative">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:80px_80px] -z-10"></div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <NavigationMenu className="">
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} w-full bg-black`}
            >
              Home
            </NavigationMenuLink>
          </Link>
          <ModeToggle />
        </NavigationMenu>
        <div className="h-screen flex items-center justify-center">
          {children}
        </div>
      </ThemeProvider>
    </section>
  );
}
