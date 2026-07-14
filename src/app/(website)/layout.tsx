import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-20 md:pt-24">{children}</div>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;

