// redirect uri de desenvolvimento do expo o @l1nds0n é o user logado no expo
const REDIRECT_URI = 'https://auth.expo.io/@l1nds0n/gameplay';
const SCOPE = 'identify%20email%20connections%20guilds';
const RESPONSE_TYPE = 'token';
const { CLIENT_ID } = process.env;
const CDN_IMAGE = 'https://cdn.discordapp.com';

export { REDIRECT_URI, SCOPE, RESPONSE_TYPE, CLIENT_ID, CDN_IMAGE };
