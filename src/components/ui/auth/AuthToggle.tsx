import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthToggle() {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <div className="flex p-1.5 bg-gray-100/80 rounded-xl mb-12">
      <Link
        href="/sign-in"
        className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isSignIn
            ? "bg-white text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        SIGN IN
      </Link>
      <Link
        href="/sign-up"
        className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          !isSignIn
            ? "bg-white text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        SIGN UP
      </Link>
    </div>
  );
}
