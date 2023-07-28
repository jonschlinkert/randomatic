// Type definitions for randomatic 3.1
// Project: https://github.com/jonschlinkert/randomatic
// Definitions by: Sang Dang <https://github.com/sangdth>

interface Options {
  chars?: string;
  exclude?: string | string[];
}

declare function randomatic(pattern: string, length?: number, options?: Options): string;

declare namespace randomatic {
  const isCrypto: boolean;
}

export = randomatic;
