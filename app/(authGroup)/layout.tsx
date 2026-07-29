import { Navbar } from "@/components/shared/navbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default DashboardLayout;
