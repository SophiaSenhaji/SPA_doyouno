
export const getDate = dateString => {
    const [year, month, day] = dateString.split(/-/g);
    const newDate = new Date(year, month - 1, day);
    return newDate instanceof Date ? newDate.valueOf() : Date.now();
}

export const getDateString = date => {
    if (!date) return undefined;
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
}