#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import util from 'util'

(async () => {

  const readFileSync = util.promisify(fs.readFileSync)

  const argv = yargs(process.argv.slice(2))
    .demandCommand(2)
    .argv

  const [ input, output ] = argv._

  const digits = fs.existsSync(input as fs.PathLike) ? await fs.readFileSync(input, 'utf-8')
    .split('\n')
    .filter(Boolean) : ['1', '45', '90']

  const multipliedDigits = digits.map(digit => +digit * 2);

  await fs.writeFileSync(output, JSON.stringify(multipliedDigits));

})()
