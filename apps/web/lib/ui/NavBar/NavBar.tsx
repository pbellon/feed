import api from "@/lib/api";
import NavBarLinks from "./NavBarLinks";

export default async function NavBar() {
  const websites = api.getWebsites();

  return (
    <div>
      <NavBarLinks />
    </div>
  );
}
