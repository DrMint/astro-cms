import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
  ({ cookies, url, rewrite, redirect }, next) => {
    if (url.pathname.startsWith("/admin")) {
      if (!cookies.has("astrocms-token") && url.pathname !== "/admin/login") {
        return rewrite("/admin/login");
      }
      if (cookies.has("astrocms-token") && url.pathname === "/admin/login") {
        return redirect("/admin");
      }
    }
    return next();
  }
);
