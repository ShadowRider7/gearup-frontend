import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getUser } from "@/service/getUser";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div className="">
      <Navbar user={user}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
