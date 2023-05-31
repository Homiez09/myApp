import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { theme, ConfigProvider } from "antd";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={darkTheme}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#28C2F4",
            },
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
    space: {},
    fonts: {},
  }
});