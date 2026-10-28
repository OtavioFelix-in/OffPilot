---
type: regex
target: { source: file, path: index.html }
pattern: '(?![©®™])\p{Extended_Pictographic}'
flags: u
match: not_contains
---
