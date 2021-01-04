#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import util from 'util'

(async () => {

  const readFileSync = util.promisify(fs.readFileSync)

  const argv = yargs(process.argv)
    .option('input', {
      type: 'string',
      default: 'digits.txt'
    })
    .option('output', {
      type: 'string',
      default: 'values.json'
    })
    .argv

  const { input, output } = argv

  const digits = await fs.readFileSync(path.join(__dirname, input), 'utf-8')
    .split('\n')
    .filter(Boolean);

  const multipliedDigits = digits.map(digit => +digit * 2);

  await fs.writeFileSync(path.join(__dirname, output), JSON.stringify(multipliedDigits));

})()
