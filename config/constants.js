export const BASE_URL = "https://homolog-touchsmart.grupotechnos.com.br";
export const API_V2 = "/api/v2/";
export const API_V3 = "/api/v2/";
export const USER_INFOS = {
    EMAIL: "mecowa5073@ukgent.com",
    PASSWORD: "Technos@123",
}
export const SESSION_INFO = {
    TOKEN: "KpakCebm6olRQyBayfXSog",
    USER_ID: "mecowa5073@ukgent.com",
    CLIENT: "MkoZhWCkSPb2wlaAOi4j4Q"
}

export const DEFAULT_PARAMS = {
    headers: {
        'Content-Type': 'application/json',
        'access-token': SESSION_INFO.TOKEN,
        'uid': SESSION_INFO.USER_ID,
        'client': SESSION_INFO.CLIENT,
    },
};