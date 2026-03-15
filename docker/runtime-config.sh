#!/bin/sh
set -eu

CONFIG_PATH="/usr/share/nginx/html/config.js"

cat > "$CONFIG_PATH" <<EOF
window.__APP_CONFIG__ = {
  VITE_API_URL: "${VITE_API_URL:-}",
  VITE_PARSER_API_URL: "${VITE_PARSER_API_URL:-}"
};
EOF
