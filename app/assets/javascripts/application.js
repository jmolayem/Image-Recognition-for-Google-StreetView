// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

google.maps.event.addDomListener(window, 'load', gdrive.init);

function createVideo(){
    var origin = $('#startloc').val();
    var dest = $('#endloc').val();
    var density = $('#density').val();
    /*//Test code
    origin="2225 Channing Way Berkeley 94704"
    dest = "2220 Piedmont Avenue, Berkeley";
    density=1;
    */
    if(density==0 || origin=="" || dest=="")return;
    gdrive.setDensity(density);
    $("#create-video").unbind();
    $("#create-video").addClass("disabled");
    $('#video').html('<i class="icon-refresh icon-spin"></i>');
    gdrive.createVideo(origin, dest, function(){
        $('#video').html('<img id="video-img"/>');
        
        $("#create-video").bind("click", createVideo);
        $("#create-video").removeClass("disabled");
    }, function(resp){
        $('#video').html('');
        alert(resp.status);
        $("#create-video").bind("click", createVideo);
        $("#create-video").removeClass("disabled");
    });
}
$(function () {
    // Custom selects
    $("#density").dropkick();
    $("#speed").dropkick({
        change: function (value, label) {
            if(value==0)return;
            gdrive.setSpeed(value);
        }
    });
    $("#create-video").bind("click", createVideo);
    $(".play-pause").bind("click", function(){
        if($(this).hasClass('pause')){
            gdrive.pause();
            $(this).removeClass('pause');
        }
        else {
            gdrive.start(function(){
                $(".play-pause").removeClass('pause');
            });
            $(this).addClass('pause');
        }
    });
    $('.restart').bind('click', function(){
        gdrive.stop();
        $(".play-pause").removeClass('pause');
    })
})