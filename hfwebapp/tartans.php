<!DOCTYPE html> 
<html manifest="manifest.appcache.php"> 
<head> 
<?php include_once('inc/head.php') ?>
</head> 
<body> 

<div data-role="page" id="tartans_page">
	<div data-role="header" data-position="fixed" data-theme="b">
		<h1>Popular Tartans</h1>
    <a href="build.php" data-role="button" data-icon="plus" class="ui-btn-right" data-theme="b">Create</a>
	</div>

	<div data-role="content">	
    <ul data-role="listview" data-filter="true" id="tartans">
    <?php include('inc/list.php') ?>
    </ul>
	</div><!-- /content -->

  <div data-role="footer" data-position="fixed" data-theme="b">
    <div data-role="navbar">
      <ul>
        <li><a href="index.php" data-icon="info">About</a></li>
        <li><a href="findevent.php" data-icon="star">Events</a></li>
        <li><a href="tartans.php" data-icon="grid" class="ui-btn-active">Tartans</a></li>
      </ul>
    </div>
  </div>

</div><!-- /page -->
<script>
  var tartanPage = $('#tartans_page');
  tartanPage.on('pageinit', function() {
      if (!tartanPage.data.cacheManager) {
          tartanPage.data.cacheManager = new CacheManager('#tartans_page');     
      } 
      tartanPage.data.cacheManager.ensureFreshContent('#tartans', 'inc/list.php'); 
  }); 
</script>
</body>
</html>