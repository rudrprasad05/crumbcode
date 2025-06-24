import { setCookie } from 'nookies';

/**
 *
 * @param name string
 * @param val string
 */
export function SetCookie(name: string, val: string) {
    setCookie(null, name, val, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
}
