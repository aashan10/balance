export const isDigit =  (char: string): boolean =>  {
    return char >= "0" && char <= "9";
}

export const isWhiteSpace = (char: string): boolean => {
    const regex = new RegExp('\\s', 'g');
    return regex.test(char);
}