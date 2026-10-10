
import { Permanent_Marker } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "",
};

const permanentMarker = Permanent_Marker({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-permanent-marker',
});


export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={permanentMarker.variable}>
      <body>{children}</body>
    </html>
  );
}
