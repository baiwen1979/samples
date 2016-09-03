<!DOCTYPE html> 
<html> 
<?php include_once('inc/head.php') ?>
</head> 
<body> 

<div data-role="page" id="tartan-<?php print $this->getBaseName(); ?>">
  <style type="text/css">
    #tartan-<?php print $this->getBaseName(); ?> { 
      background-image: url('<?php print PUBLIC_TARTAN_DIR ?>images/<?php print $this->getBaseName(); ?>-200.png'); 
      min-height: 240px;
    }
  </style>
	<div data-role="header" data-position="fixed">
    <a href="../tartans.php" data-rel="back" data-direction="reverse" data-icon="back" />Back</a>
		<h1><?php print $this->name; ?></h1>
	</div><!-- /header -->

	<div data-role="content">
    
	</div><!-- /content -->
	<div data-role="footer" data-position="fixed">
		<h4>Bring forrit the tartan!</h4>
	</div><!-- /footer -->
</div><!-- /page -->

</body>
</html>