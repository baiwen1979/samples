(function() {

  var imageCaptureSupported = false;

  $(document).bind("mobileinit", function() {
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });

  var initPhoneGap = function() {
  	if (!navigator.device || !navigator.device.capture) {
  		return;
  	}
  	imageCaptureSupported = true;
  	if (navigator.device.platform && navigator.device.platform == 'Android') {
  		$('body').addClass('android');
  	}
  };

  var initDevice = function() {
  	if (typeof(window.localStorage) == 'object') {
  		$('.foundTartan').click(tartanFound);
  		refreshTartans();
  		addResetButton();
  	}
  	$(document).bind('deviceready', false, initPhoneGap);
  };

  $(document).ready(initDevice);

  var refreshTartans = function () {
  	$('ul.details').each(function() {
  		var myId = $(this).attr('id');
  		var tartanKey = 'found-' + myId;
  		var foundValue = localStorage.getItem(tartanKey);
  		var isFound = Boolean (foundValue);

  		$('#vendor-' + myId).toggleClass('found', isFound);
  		$('[data-url*="' + myId + '"]').toggleClass('found', isFound);
  		$('#' + tartanKey).closest('li').toggle(!isFound);

  		var hasPhoto = (isFound && foundValue != 'true') || false;
  		if (hasPhoto) {
  			if (!$(this).find('.tartanImage').length) {
  				var tartanHolder = $('<p></p>').append($('<img>').attr({
  					'src': foundValue,
  					'class': 'tartanImage'
  				}));
  				$(this).append('<li data-role="list-divider">My Photo of the Tartan!</li>');
  				$('<li></li>').append(tartanHolder).appendTo($(this));
  			}
  		}
  	});

  	$('ul').each(function() {
  		if ($(this).data('listview')) {
  			$(this).listview('refresh');
  		}
  	});
  };

  var tartanFound = function(e) {
  	var tartanKey = $(e.currentTarget).attr('id');
  	if (imageCaptureSupported) {
  		navigator.device.capture.captureImage(function(mediaFiles) {
  			localStorage.setItem(tartanKey, mediaFiles[0].fullPath);
  			refreshTartans();
  		}, captureError, {limit: 1});
  	}
  	else {
  	  	localStorage.setItem(tartanKey, 'true');
  		refreshTartans();	
  	}
  };

  var captureError = function(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };

  var addResetButton = function() {
  	var resetButton = $('<a></a>').attr('data-role', 'button').html('Start Over!');
  	resetButton.click(function() {
  		localStorage.clear();
  		refreshTartans();
  	});

  	resetButton.appendTo($('#booths'));
  };

}());