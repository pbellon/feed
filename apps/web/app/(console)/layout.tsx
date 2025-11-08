import NavBar, { NavBarSkeleton } from "@/lib/ui/NavBar";
import { Suspense } from "react";

export default function ConsoleLayout({ children }) {
  return (
    <>
      <Suspense fallback={<NavBarSkeleton />}>
        <NavBar />
      </Suspense>

      <main>{children}</main>
    </>
  );
}
