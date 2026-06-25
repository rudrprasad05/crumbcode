#!/bin/sh
set -eu

replace_placeholder() {
  placeholder="$1"
  value="${2:-}"
  escaped_value=$(printf '%s' "$value" | sed -e 's/[\/&]/\\&/g')

  find . -type f \
    \( -name '*.js' -o -name '*.json' -o -name '*.html' -o -name '*.txt' \) \
    -exec sed -i "s/$placeholder/$escaped_value/g" {} +
}

replace_placeholder "__NEXT_PUBLIC_API_BASE_URL__" "${NEXT_PUBLIC_API_BASE_URL:-}"

exec "$@"
