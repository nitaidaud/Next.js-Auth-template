import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { privateRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute)
    return Response.redirect(`${nextUrl.origin}${process.env.HOME_URL!}`);

  if (isAuthRoute && !isLoggedIn) return;

  if (!isLoggedIn && isPrivateRoute)
    return Response.redirect(`${nextUrl.origin}${process.env.LOGIN_PAGE_URL}`);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
