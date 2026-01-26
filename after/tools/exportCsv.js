const fs = require('fs');
const path = require('path');
const { readAllSubmissions } = require('../src/services/storage');

function csvEscape(value) {
    const s = String(value ?? '');
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
}

function main() {
    const rows = readAllSubmissions();

    const headers = ['id', 'ts', 'name', 'email', 'message'];
    const lines = [headers.join(',')];

    for (const r of rows) {
        lines.push(
            headers.map((h) => csvEscape(r[h])).join(',')
        );
    }

    const outDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outPath = path.join(outDir, 'submissions.csv');
    fs.writeFileSync(outPath, lines.join('\n'), 'utf8');

    console.log(`Exported ${rows.length} submissions to ${outPath}`);
}

main();
