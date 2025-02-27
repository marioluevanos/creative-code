<?php
$display_section = get_sub_field('display_section') == "Show";
$headline = get_sub_field('headline');
$text = get_sub_field('text');
$button = get_sub_field('button');
$button_url = $button['url'];
$button_title = $button['title'];
$button_target = $button['target'] ? $button['target'] : '_self';
?>

<?php if ( $display_section ) : ?>

<link rel="stylesheet" href="https://staging.jcwhitney.com/wp-content/themes/jcwhitney/css/ImageCompare.css?v=4"/>
<link rel="stylesheet" href="https://staging.jcwhitney.com/wp-content/themes/jcwhitney/css/Magazines.css?v=4"/>

<div id="magazines-app"></div>

<script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
<script type="module">
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Magazines from "https://staging.jcwhitney.com/wp-content/themes/jcwhitney/js/Magazines.js?v=4";

createApp({
  components: { Magazines },
  template: '<Magazines/>'
}).mount("#magazines-app");

</script>

<?php endif; ?>