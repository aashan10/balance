export const isDigit =  (char: any): boolean =>  {
    return Boolean([true, true, true, true, true, true, true, true, true, true][char]);
}

export const isWhiteSpace = (char: string): boolean => {
    const regex = new RegExp('\\s', 'g');
    return regex.test(char);
}