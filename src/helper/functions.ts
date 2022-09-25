export const isDigit =  (char: string): boolean =>  {
    return char >= "0" && char <= "9";
}

export const isWhiteSpace = (char: string): boolean => {
    const regex = new RegExp('\\s', 'g');
    return regex.test(char);
}

export const isAlphaNumeric = (char:string): boolean => {
    return /[A-Za-z0-9_]+/g.test(char);
}