export const BASE_URL = "https://homolog-mormaiismartwatches.grupotechnos.com.br";
export const API_V2 = "/api/v2/";
export const API_V3 = "/api/v3/";

export const AVAILABLE_SLUGS = {
    MORMAII_LIFE: "mlife"
}

export const USER_INFOS = {
    EMAIL: "mecowa5073@ukgent.com",
    PASSWORD: "Technos@123",
}
export const SESSION_INFO = {
    TOKEN: "ZuwM5BDHJG0vKGIHE3-_5A",
    CLIENT: "KFINZrev9vMVY5zq_ysvVA",
    USER_ID: "mecowa5073@ukgent.com"
}

export const DEFAULT_PARAMS = {
    headers: {
        'Content-Type': 'application/json',
        'access-token': SESSION_INFO.TOKEN,
        'uid': SESSION_INFO.USER_ID,
        'client': SESSION_INFO.CLIENT,
    },
};

export const TEST_PARAMS = {
    DURATION_LIMITS: 1000
}