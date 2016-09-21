(function() {
    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};

    Handlebars.partials = Handlebars.templates;

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    $.get('/authors.JSON', { limit: 20 }, function(data) {
        $('#profilepics').html(Handlebars.templates.profileScr(data));
        $('.profilepic').on('click', function(e){
            e.stopPropagation();
            $('.modal').css({display: 'block'});
            $('.modalContent').html(Handlebars.templates.profileDetails(data.authors[e.target.id])).on('click', function(e){e.stopPropagation();});
            $(document).on('click.remove', function(){
                $('.modal').css({display: 'none'});
                $(this).off('.remove');
            });

        });
    });

})();
