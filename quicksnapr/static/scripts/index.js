var video;
var cameraReady = false;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.URL = window.URL || window.webkitURL;


var snapPicture = function(w, h, element) {
  var wrapper = document.createElement('figure');
  var newcanvas = document.createElement('canvas');
  var newContext = newcanvas.getContext('2d');
  newcanvas.width = w;
  newcanvas.height = h;
  newContext.drawImage(element, 0, 0, w, h);
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
  var root = $('#root');
  var capture = $('#capture');
  var videoelement = $("#camerastream");
  var camerainput = $("#camerainput");
  var fallback = $("#fallbackcamera");

  var actions = $('#actions');
  var figs = snap.find('figure');

  snap.on('click','figure', function(e){
    if($(this).hasClass('selected')) {
      snap.find('figure').removeClass('non').removeClass('selected');
      actions.removeClass("show");
    }
    else {
      snap.find('figure').removeClass('selected').addClass('non');
      snap.find('figure div').detach();
      $(this).removeClass('non').addClass('selected');
      actions.addClass("show");
    }
    
  });
  
  capture.on("click", "", function() {
     root.removeClass('list');
  });

  actions.on('click','#delete',function(){
    snap.find('figure.selected').removeClass('ease-in active non').addClass('ease-out');
    snap.find('figure.non').removeClass('non');
    
    snap.find('figure.ease-out').remove();
    actions.removeClass("show");
  });
	
  // Hook up the video camera.
  video = $("video")[0];

  if(navigator.getUserMedia) {
    navigator.getUserMedia({ video: true }, function(s) {
      video.src = URL.createObjectURL(s);
      cameraReady = true;
    });
  }
  else {
    videoelement.hide();
    fallback.show();
  }
  
  camerainput.change(function(e) {
    var files = e.target.files;
    if(files.length > 0  && files[0].type.indexOf("image/") == 0) {
        var img = new Image();
        img.onload = function() {
          snapPicture(img.naturalWidth, img.naturalWidth, img);
          root.addClass('list');
        }
        img.src = URL.createObjectURL(files[0]); 
    }
    else {
      // Not the correct type of file
    }
  });

  videoelement.click(function() {
     // Snap straight away.
     if(cameraReady) {
       snapPicture(video.videoWidth, video.videoHeight, video);
       root.addClass('list');
     }
  });
 
  $('#save').click(function() {
    var canvas = snap.find('figure.selected canvas')[0];
    $(this).attr("href", canvas.toDataURL("image/png"));
  });
});
