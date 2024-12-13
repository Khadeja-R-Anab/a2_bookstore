import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <LoadingSpinner/>
        <Layout> 
          <Component {...pageProps} />
        </Layout>
      </LoadingProvider>
    </AuthProvider> 
  );
}
