#!/usr/bin/env bash
set -euo pipefail
origem="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/tela"
if [ ! -f "$origem/index.html" ]; then
  echo "não achei a tela de exemplo em $origem" >&2
  exit 1
fi
cp -r "$origem" ./tela
