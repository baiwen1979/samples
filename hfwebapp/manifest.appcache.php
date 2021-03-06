<?php header('Content-type: text/cache-manifest'); ?>
CACHE MANIFEST
# The Manifest for app
NETWORK:
*
CACHE:
index.php
tartans.php
styles/main.css
styles/jquery.mobile-1.4.5.min.css
scripts/build.js
scripts/jquery.min.js
scripts/jquery.mobile-1.4.5.min.js
styles/images/ajax-loader.gif

<?php
require_once('config.php');

// Cache the HTML files
$html_dir = TARTAN_HTML_DIR;
if (is_dir($html_dir)) {
  if ($dh = opendir($html_dir)) {
    while (($file = readdir($dh)) !== false) {
      if (filetype($html_dir . $file) === 'file' && strpos($file, '.html') !== FALSE) {
        print PUBLIC_TARTAN_DIR . $file . "\r\n";
      }
    }
    closedir($dh);
  }
}

// Cache the images
$img_dir = TARTAN_IMAGE_DIR;
if (is_dir($img_dir)) {
  if ($dh = opendir($img_dir)) {
    while (($file = readdir($dh)) !== false) {
      if (filetype($img_dir . $file) === 'file' && strpos($file, '-200.png') !== FALSE) {
        print PUBLIC_TARTAN_DIR . 'images/' . $file . "\r\n";
      }
    }
    closedir($dh);
  }
}

?>