// Type definitions for randomatic 3.1
// Project: https://github.com/jonschlinkert/randomatic
// Definitions by: Sang Dang <https://github.com/sangdth>

interface randomOptions {
  chars: string;
  exclude?: string | string[];
}

declare function randomatic(p: string, l?: number, options?: randomOptions): string;

declare namespace randomatic {
  const isCrypto: boolean;
}

export = randomatic;
