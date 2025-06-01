import './globals.css';

export const metadata = {
  title: 'Sanando Raíces - [Nombre Terapeuta]',
  description: 'Terapia sistémica y Constelaciones Familiares',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-base">{children}</body>
    </html>
  );
}
