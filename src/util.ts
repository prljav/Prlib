//TODO: make sure this actually works and doesnt break randomly
export function removeAnsiCodes(input: string) {
    const ansiRegex = /\u001b\[[0-9;]*[a-zA-Z]/g;
    return input.replace(ansiRegex, '');
}