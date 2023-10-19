export const getSumByKey = (array, key) => array.reduce((sum, current) => sum + current[key], 0);
