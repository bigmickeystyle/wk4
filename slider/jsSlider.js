$('img').on('dragstart', function(e){
    e.preventDefault();
});

$('#bar').on('mouseover', function(){
    $(this).css({cursor: "pointer"});
});

$('#bar').on('mousedown', function(){
    $(document).on('mousemove.remmove', function(e){
        e.preventDefault();
        var movement = e.pageX;
        var width = parseInt($('.images').css('width'), 10);
        if(e.pageX < width && e.pageX > 0){
            $('#bar').css({left: movement});
            var cropper = $('#bar').css('left');
            $('#image2').css({width: cropper});
        }
        $(document).on('mouseup.remove', function(){
            $(this).off('.remmove');
            $(this).off('.remove');
        });
    });
});
