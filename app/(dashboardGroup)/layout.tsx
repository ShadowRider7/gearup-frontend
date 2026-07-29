import { Navbar } from "@/components/shared/navbar";
import { getUser } from "@/service/getUser";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div>
      <Navbar user={user}></Navbar>
      {children}
    </div>
  );
};

export default PublicLayout;
