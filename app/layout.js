import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sri Udupi Food Hub | Authentic South Indian Cuisine in Bangalore",
  description:
    "Sri Udupi Food Hub brings you the rich taste of authentic South Indian delicacies in the heart of Bangalore. From crispy dosas to flavorful idlis, explore a wide range of vegetarian dishes made with tradition and love.",
  keywords: [
    "Sri Udupi Food Hub",
    "South Indian food Bangalore",
    "Authentic Udupi cuisine",
    "Vegetarian restaurant Bangalore",
    "Best dosa in Bangalore",
    "Idli vada Bangalore",
    "Traditional South Indian meals",
  ],
  authors: [{ name: "Sri Udupi Food Hub" }],
  openGraph: {
    title: "Sri Udupi Food Hub | Authentic South Indian Cuisine in Bangalore",
    description:
      "Taste the flavors of Udupi — dosas, idlis, vadas, and more at Sri Udupi Food Hub, Commercial Street, Bangalore.",
    // url: "https://sriudupifoodhub.com",
    siteName: "Sri Udupi Food Hub",
    images: [
      {
        url: "/sufh_logo.svg", // replace with actual OG image in public/
        width: 1200,
        height: 630,
        alt: "Sri Udupi Food Hub - Authentic South Indian Cuisine",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.jpg", // or .png
    shortcut: "/favicon.jpg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
