<!DOCTYPE html> 
<html> 
<head> 
  <?php include_once('inc/head.php') ?>
</head> 
<body>
  
  <div data-role="page">
    <div data-role="header" data-position="fixed">
      <a href="tartans.php" data-rel="back" data-icon="back" data-role="button">Back</a>
      <h1>Events</h1>
    </div><!-- /header -->
  
    <div data-role="content">
      <ul data-role="listview" data-inset="true">
        <?php

        require_once(dirname(__FILE__) . '/inc/event_list.inc');
        require_once(dirname(__FILE__) . '/inc/event_search.inc');

        $search = new TartanatorEventSearch($events);
        if ($search->isSearch()): ?>
          <li data-role="list-divider"><h3>Matching Events</h3></li>
        <?php endif; ?>
        <?php if ($search->hasMatchingEvents()): ?>
          <?php foreach($search->getMatchingEvents() as $event): ?>
          <li><h3><?php print $event['title']; ?></h3>
          <p><?php print $event['address']; ?><br />
          <strong><?php print $event['city'] ?>, <?php print $event['state']; ?></strong> <?php print $event['postal_code']; ?><br />
          <?php print $event['distance_formatted']; ?></p>
          <p class="ui-li-aside"><strong><?php print $event['date']; ?></strong></p>
          </li>
          <?php endforeach; ?>
        <?php endif; ?>
        <?php if ($search->isSearch() && !$search->hasMatchingEvents()): ?>
          <li><strong>Sorry, no matching events found!</strong></li>
        <?php endif; ?>
      </ul>
    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
      <div data-role="navbar"> 
        <ul> 
          <li><a href="index.php" data-icon="info">About</a></li> 
          <li><a href="findevent.php" data-icon="star" class="ui-btn-active">Events</a></li> 
          <li><a href="tartans.php" data-icon="grid">Tartans</a></li> 
        </ul> 
      </div><!-- /navbar --> 
    </div><!-- /footer -->

  </div><!-- /page -->

</body>
</html>
