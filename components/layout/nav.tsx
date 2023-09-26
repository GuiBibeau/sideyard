import { currentUser } from "@clerk/nextjs";
import Navbar from "./navbar";

export default async function Nav() {
  const userData = await currentUser();
  if (userData) {
    const { emailAddresses } = userData;
    const user = { email: emailAddresses[0].emailAddress, image: null };
    return <Navbar user={user} />;
  }
  return <Navbar user={null} />;
}
