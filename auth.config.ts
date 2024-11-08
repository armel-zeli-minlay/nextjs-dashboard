import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnLogin = nextUrl.pathname === '/login'; // Vérifie si l'utilisateur essaie d'accéder à /login

            // Si l'utilisateur est déjà connecté et essaie d'accéder à /login
            if (isLoggedIn && isOnLogin) {
                return Response.redirect(new URL('/dashboard', nextUrl)); // Redirige vers /dashboard
            }
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Si la redirection est vers /login avec un callbackUrl
            if (url.startsWith(baseUrl)) {
                return url; // La redirection vers /login sera correcte
            }
            return baseUrl + '/dashboard'; // Après la connexion, on redirige vers /dashboard
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;