#!/usr/bin/env bash
# Skleja źródła w jeden samodzielny plik dist/index.html
set -e
cd "$(dirname "$0")/src"
cat head.html f_scanner.js f_samples.js a_core.js b_level.js b_core.js c_units.js c2_vox.js d_ai.js g_ext.js h_house.js e_game.js > ../dist/index.html
printf '\n</script>\n</body>\n</html>\n' >> ../dist/index.html
echo "dist/index.html gotowy"
