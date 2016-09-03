<!DOCTYPE html> 
<html> 
<head>
<?php include_once('inc/head.php') ?>
</head> 
<body> 

<div data-role="page" id="event_page">
  <script src="scripts/geo.js"></script>
  <script src="scripts/geolocation.js"></script>
  <div data-role="header" data-position="fixed" data-theme="b">
  	<h1>Find Event</h1>
  </div>

  <div data-role="header" class="forrit">
    Bring forrit the tartan!
  </div>

  <div data-role="content">	
    <form action="events.php" id="search_form" method="get">
      <div data-role="fieldcontain">
        <label for="state_filter">Filter by State:</label>
        <select name="state_filter" id="state_filter">
          <option value="">Choose State</option>
          <option value="AL">Alabama</option> 
          <option value="AK">Alaska</option> 
          <option value="AZ">Arizona</option> 
          <option value="AR">Arkansas</option> 
          <option value="CA">California</option> 
          <option value="CO">Colorado</option> 
          <option value="CT">Connecticut</option> 
          <option value="DE">Delaware</option> 
          <option value="DC">District Of Columbia</option> 
          <option value="FL">Florida</option> 
          <option value="GA">Georgia</option> 
          <option value="HI">Hawaii</option> 
          <option value="ID">Idaho</option> 
          <option value="IL">Illinois</option> 
          <option value="IN">Indiana</option> 
          <option value="IA">Iowa</option> 
          <option value="KS">Kansas</option> 
          <option value="KY">Kentucky</option> 
          <option value="LA">Louisiana</option> 
          <option value="ME">Maine</option> 
          <option value="MD">Maryland</option> 
          <option value="MA">Massachusetts</option> 
          <option value="MI">Michigan</option> 
          <option value="MN">Minnesota</option> 
          <option value="MS">Mississippi</option> 
          <option value="MO">Missouri</option> 
          <option value="MT">Montana</option> 
          <option value="NE">Nebraska</option> 
          <option value="NV">Nevada</option> 
          <option value="NH">New Hampshire</option> 
          <option value="NJ">New Jersey</option> 
          <option value="NM">New Mexico</option> 
          <option value="NY">New York</option> 
          <option value="NC">North Carolina</option> 
          <option value="ND">North Dakota</option> 
          <option value="OH">Ohio</option> 
          <option value="OK">Oklahoma</option> 
          <option value="OR">Oregon</option> 
          <option value="PA">Pennsylvania</option> 
          <option value="RI">Rhode Island</option> 
          <option value="SC">South Carolina</option> 
          <option value="SD">South Dakota</option> 
          <option value="TN">Tennessee</option> 
          <option value="TX">Texas</option> 
          <option value="UT">Utah</option> 
          <option value="VT">Vermont</option> 
          <option value="VA">Virginia</option> 
          <option value="WA">Washington</option> 
          <option value="WV">West Virginia</option> 
          <option value="WI">Wisconsin</option> 
          <option value="WY">Wyoming</option>
        </select>
      </div>
      <div data-role="fieldcontain">
        <input type="submit" id="search_submit" value="Find Events"/>
      </div>
    </form>  
  </div>

  <div data-role="footer" data-position="fixed" data-theme="b">
    <div data-role="navbar">
  	  <ul>
  	    <li><a href="index.php" data-icon="info">About</a></li>
  	    <li><a href="findevent.php" data-icon="star" class="ui-btn-active">Events</a></li>
  	    <li><a href="tartans.php" data-icon="grid">Tartans</a></li>
  	  </ul>
  	</div>
  </div>
</div>

</body>
</html>