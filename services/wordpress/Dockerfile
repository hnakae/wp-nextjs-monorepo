FROM wordpress:6.8.2-php8.4-fpm

# Install WP-CLI
RUN set -e &&     apt-get update &&     apt-get install -y wget less unzip --no-install-recommends &&     rm -rf /var/lib/apt/lists/* &&     wget -O /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar &&     chmod +x /usr/local/bin/wp &&     ls -l /usr/local/bin &&     /usr/local/bin/wp --info



