FROM wordpress:6.8.2-php8.4-apache

# Install WP-CLI
RUN apt-get update \
 && apt-get install -y wget less unzip --no-install-recommends \
 && rm -rf /var/lib/apt/lists/* \
 && wget -O /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
 && chmod +x /usr/local/bin/wp

# Enable Apache modules for CORS
RUN a2enmod headers rewrite

# Add CORS headers to Apache configuration
COPY ./.docker/apache-cors.conf /etc/apache2/conf-available/apache-cors.conf
RUN a2enconf apache-cors
