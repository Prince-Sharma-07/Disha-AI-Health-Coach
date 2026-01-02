import "./globals.css";

export const metadata = {
  title: "Disha – AI Health Coach",
  description: "Mini AI Health Coach by Curelink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
