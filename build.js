const fs = require('fs');
require('dotenv').config();

const filePath = './family-report.html';
let content = fs.readFileSync(filePath, 'utf8');

if (!process.env.API_KEY) {
    console.error('API_KEY not found in .env file');
    process.exit(1);
}

content = content.replace('const API_KEY = \'your_actual_api_key_here\';', `const API_KEY = '${process.env.API_KEY}';`);

fs.writeFileSync(filePath, content);

console.log('API key has been injected into family-report.html');