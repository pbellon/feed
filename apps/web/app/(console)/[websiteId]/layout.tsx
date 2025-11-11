import Container from "@mui/material/Container";
import { Suspense } from "react";

import NavBar, { NavBarSkeleton } from "@/lib/ui/NavBar";

type ConsoleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ websiteId: string }>;
}>;

export default async function ConsoleLayout({
  children,
  params,
}: ConsoleLayoutProps) {
  const { websiteId } = await params;
  return (
    <>
      <Suspense fallback={<NavBarSkeleton />}>
        <NavBar websiteId={websiteId} />
      </Suspense>

      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
