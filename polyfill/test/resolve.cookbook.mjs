/*
 ** Copyright (C) 2018-2019 Bloomberg LP. All rights reserved.
 ** This code is governed by the license found in the LICENSE file.
 */

import fs from 'fs';
const PKG = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' }));
export function resolve(specifier, parent, defaultResolve) {
  if (specifier === PKG.name) {
    specifier = new URL('../lib/index.mjs', import.meta.url).toString();
  }
  return defaultResolve(specifier, parent);
}

export async function transformSource(source, { url, format }, defaultTransformSource) {
  if (typeof source === 'string' && url !== 'all.mjs' && !url.endsWith('polyfill/lib/index.mjs')) {
    return {
      source: "import { Temporal } from 'tc39-temporal';\nimport assert from 'assert';\n" + source
    };
  } else {
    // source could be a buffer, e.g. for WASM
    return defaultTransformSource(source, { url, format }, defaultTransformSource);
  }
}
