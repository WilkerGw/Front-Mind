import DevButton from '@/components/DevButton';
import DefaultLayout from '../layouts/DefaultLayout';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DefaultLayout>{children}</DefaultLayout>
        <DevButton/>
      </body>
    </html>
  );
}