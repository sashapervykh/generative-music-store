import { useEffect, type ReactNode } from "react";
import { useLocales } from "../../hooks/useLocales";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Spin } from "antd";

export function LocaleLoader({ children }: { children: ReactNode }) {
  const { locales, setLocales } = useLocales();

  useEffect(() => {
    const requestLocales = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${API_ROUTES.LOCALES}`,
        );

        if (!response.ok) {
          throw new Error("Failed request");
        }

        const locales = await response.json();
        console.log(locales);
        setLocales(locales);
      } catch (error) {
        console.error("Request error:", error);
      }
    };

    requestLocales();
  }, []);

  if (!locales) return <Spin />;

  return <>{children}</>;
}
