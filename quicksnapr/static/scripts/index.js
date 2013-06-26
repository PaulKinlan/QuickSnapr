var video;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.URL = window.URL || window.webkitURL;


var snapPicture = function() {
  var wrapper = document.createElement('figure');
  var newcanvas = document.createElement('canvas');
  var newContext = newcanvas.getContext('2d');
  newcanvas.width = 640;
  newcanvas.height = 480;
  newContext.drawImage(video, 0, 0, 640, 480);
  $('article').hide(320);
  wrapper.appendChild(newcanvas);
  wrapper.className = 'ease-in';
  $('#snaps').append(wrapper);
};

$(function() {

  var buttons = $('footer').find('.btn');
  var snap = $('#snaps');
  var container = $('#container');
  var active = snap.find('figure.selected');
  var head = $('header');

  var actions = $('#actions');
  var figs = snap.find('figure');

  snap.on('click','figure',function(){
    snap.find('figure').removeClass('selected').addClass('non');
    snap.find('figure div').detach();
    snap.addClass('pad');
    head.addClass('pad');
    container.hide()
    $(this).removeClass('non').addClass('selected');
    actions.fadeIn(320);
  });

  snap.on("click", "figure.selected canvas", function() { 
    
  });

  actions.on('click','#delete',function(){
    snap.find('figure.selected').removeClass('ease-in active non').addClass('ease-out');
    snap.find('figure.non').removeClass('non');
    container.show();
    setTimeout(function() {
      snap.find('figure.ease-out').remove();
      actions.hide();
      snap.removeClass('pad');
      head.removeClass('pad');
    }, 800);
  });
	
  // Hook up the video camera.
  video = $("video")[0];

  if(navigator.getUserMedia) {
    navigator.getUserMedia({"video": true}, function(s) {
      video.src = URL.createObjectURL(s);
    });
  }

  $('#container video').click(function() {
     // Snap straight away.
     snapPicture();
  });
 
  $('#save').click(function() {
    
  });
});
