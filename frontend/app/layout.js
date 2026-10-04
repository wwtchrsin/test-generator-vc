import "./globals.css";

export const metadata = {
  title: "English Grammar Tests",
  description: "Тесты по английской грамматике",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
