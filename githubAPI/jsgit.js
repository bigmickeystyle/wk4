var templates = document.querySelectorAll('script[type="text/handlebars"]');

Handlebars.templates = Handlebars.templates || {};

Handlebars.partials = Handlebars.templates;

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});
$('#submit').on('click',function(){
    var user = $('#user').val();
    $('.avatar').remove();
    $('.text').remove();

    $.ajax({
        url: 'https://api.github.com/users/' + user + '/repos',
        method: 'GET',
        data: {
            type: 'all',
            limit: 10
        },
        headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: 'Basic ' + btoa('bigmickeystyle:Awe1some')
        },
        success: function(data) {
            console.log(data);
            for (let i = 0; i < data.length; i++){
                $('.profilepics').append(Handlebars.templates.avatars(data[i]));
            }
            $('.avatar').on('mouseover', function(){
                $(this).css({cursor: 'pointer'});
            });
            $('.avatar').on('click.expand', function(e){
                e.stopPropagation();
                $(this).off('.expand');
                var plugin = this.id;
                $.ajax({
                    url: 'https://api.github.com/repos/' + user + '/' + plugin + '/commits',
                    method: 'GET',
                    data: {
                        type: 'all',
                        limit: 10
                    },
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                        Authorization: 'Basic ' + btoa('bigmickeystyle:Awe1some')
                    },

                    error: function(){
                        console.log("error");
                        $('#' + plugin).append(Handlebars.templates.nomatches({}));
                    },

                    success: function(commits) {
                        console.log(commits);
                        var commitsLength = commits.length;
                        if (commitsLength > 10){commitsLength = 10;}
                        for (let i = 0; i < commitsLength; i++){
                            var input = {};
                            input.index = i + 1;
                            input.data = commits[i];
                            $('#' + plugin).append(Handlebars.templates.dropdown(input));
                        }
                    }
                });
                $(this).on('click', function(){
                    var clicks = $(this).data('clicks');
                    if (clicks){
                        $(this).find('.dropdown').css({display: 'block'});
                    }else{
                        $(this).find('.dropdown').css({display: 'none'});
                    }
                    $(this).data("clicks", !clicks);
                });
            });
        }
    });
});
