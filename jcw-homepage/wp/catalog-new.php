<?php
$display_section = get_sub_field('display_section') == "Show";
$heritage_logo = get_sub_field('heritage_logo');
$button = get_sub_field('button');
$button_url = $button['url'];
$button_title = $button['title'];
$button_target = $button['target'] ? $button['target'] : '_self';
$catalog_article = get_sub_field('catalog_article');
?>
<?php if ( $display_section ) : ?>

<link rel="stylesheet" href="https://staging.jcwhitney.com/wp-content/themes/jcwhitney/css/Catalog.css?v=4"/>

<div id="catalog-app"></div>

<script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
<script type="module">
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Catalog from "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/js/Catalog.js?v=4";

createApp({
  components: { Catalog },
  template: '<Catalog/>'
}).mount("#catalog-app");

</script>

<?php endif; ?>