import { io } from 'socket.io-client';
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_API_URL ? undefined : 'http://192.168.37.174:3003';

export const socket = io(process.env.NEXT_PUBLIC_API_URL);