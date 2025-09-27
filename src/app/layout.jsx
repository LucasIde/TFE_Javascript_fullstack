import "./globals.css";
import "@/styles/styles.scss"
import Navbar from "@/components/Navbar";
import FooterComponent from "@/components/footer";
import { AuthProvider } from "@/components/auth/authContext";

export const metadata = {
  title: "GameDay",
  description: "Gaming Event webSite",
    icons: {
    icon: "/favicon.png", // ou "/favicon.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header>
            <Navbar/>
          </header>
          <main>
            {children}
          </main>
          <footer>
            <FooterComponent/>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
