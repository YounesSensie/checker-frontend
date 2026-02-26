"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainMenuProps {
  style?: string;
  isSolid?: boolean;
}

const MainMenu = ({ style = "", isSolid = false }: MainMenuProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  const menuItems = [
    { name: "Home",          href: "/" },
    { name: "Find Checkers", href: "/check" },
    { name: "Features",      href: anchor("#features") },
    { name: "How it Works",  href: anchor("#how-it-works") },
    { name: "Experts",       href: anchor("#checkers") },
    { name: "About",         href: anchor("#about") },
    { name: "FAQ",           href: anchor("#faq") },
    { name: "Contact",       href: anchor("#contact") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("#") || href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center">
      <ul className={`flex items-center space-x-6 ${style}`}>
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              href={item.href}
              className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                isActive(item.href)
                  ? "text-[#2cc2a5]"
                  : isSolid
                  ? "text-white/80 hover:text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {item.name}
              {/* Animated teal underline */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#2cc2a5] rounded-full transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;