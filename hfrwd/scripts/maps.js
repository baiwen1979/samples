var breakpoint = 641,
  id = 'map-container',
  viewportWidth = window.innerWidth;
if (viewportWidth > breakpoint) {
  var mapElement = document.createElement('iframe'),
      mapLink = document.getElementById('map-link');
  mapElement.id = 'map';
  /*
  mapElement.width = '300';
  mapElement.height = '300';
  mapElement.frameborder = '0';
  mapElement.scrolling = 'no';
  mapElement.marginheight = '0';
  mapElement.marginwidth = '0';
  */
  mapElement.src = 'bmaps.html';
  document.getElementById(id).insertBefore(mapElement,mapLink);
}
