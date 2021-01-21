export const getArgs = (): string[] => {
    return process.argv.slice(2);
}

export const validateArgs = (args: string[]): boolean => {
    if (args.length !== 2)
        throw new Error('There should be two input files');

    if (!args[0].endsWith('.txt') || !args[1].endsWith('.txt'))
        throw new Error('The input files should be text files');
    
    return true;
}