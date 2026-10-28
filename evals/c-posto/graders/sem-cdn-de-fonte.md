---
type: regex
target: { source: file, path: index.html }
pattern: 'fonts\.(googleapis|gstatic)\.com'
match: not_contains
---
