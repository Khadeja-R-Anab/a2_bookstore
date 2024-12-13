import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
    </AuthProvider> 
  );
}
