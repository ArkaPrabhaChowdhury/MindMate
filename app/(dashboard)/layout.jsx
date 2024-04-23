import LeftSidebar from "@/components/LeftSidebar";
import CheckToken from "@/lib/CheckToken";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <main className="flex">
          <LeftSidebar />

          <section className="bg-gray-900 flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
            <div className="w-full">
              <CheckToken />
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
