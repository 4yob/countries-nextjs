import "./globals.css";

export const metadata = {
    title: "Countries",
    icons: {
        icon: "/icons/favicon.ico",
    },
    description: "Projeto pra mostrar tudo que eu sei",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}
