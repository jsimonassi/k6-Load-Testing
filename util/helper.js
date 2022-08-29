const __randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const addRandomDate = (obj) => {
    obj["registered_at"] = __randomDate(new Date(1990, 0, 1), new Date()).toISOString();
    return obj;
}