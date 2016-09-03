<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="stylesheet" href="styles/jquery.mobile-1.4.5.min.css">
<link rel="stylesheet" href="styles/main.css">
<script src="scripts/jquery.min.js"></script>
<script type="text/javascript">
// Need to bind to mobileinit before jQ mobile library is loaded
$(document).bind('mobileinit',function() {
    $.mobile.selectmenu.prototype.options.nativeMenu = false;
});
</script>
<script src="scripts/jquery.mobile-1.4.5.min.js"></script>
<script src="scripts/cache-manager.js"></script>
<title>The Tartanator</title> 