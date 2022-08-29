export const BASE_URL = "https://teste-technosconnect.grupotechnos.com.br";
export const API_V2 = "/api/v2/";
export const API_V3 = "/api/v3/";

export const AVAILABLE_SLUGS = {
    MORMAII_LIFE: "mlife"
}

export const USER_INFOS = {
    EMAIL: "jaroli8850@seinfaq.com",
    PASSWORD: "string",
}
export const SESSION_INFO = {
    TOKEN: "l3fhjIgIPnCHYkkusa3hDg",
    CLIENT: "K1BWqdN3DDLLpJuwZazJBg",
    USER_ID: "jaroli8850@seinfaq.com"
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