import NavBar, { NavBarSkeleton } from "@/lib/ui/NavBar";
import Container from "@mui/material/Container";
import { Suspense } from "react";

export default async function ConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<NavBarSkeleton />}>
        <NavBar />
      </Suspense>

      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
