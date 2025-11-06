import fs from 'fs'

console.log('[Database init] going to load fixtures into database')

const fixtures = JSON.parse(fs.readFileSync('./data/fixtures.json', 'utf8'));
