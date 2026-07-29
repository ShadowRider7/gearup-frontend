import { Navbar } from "@/components/shared/navbar";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default PublicLayout;
