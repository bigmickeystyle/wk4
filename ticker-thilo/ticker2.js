var theTravel;
var speed = 0;
var velocity = 0.1;

function travel(){
    var tracker = 0;
    var changer;

    $(".Link").each(function(){
        changer = 130 - ((tracker + speed) % 160);
        if (changer < -30){
            changer = changer + 160;
        }

        $(this).css({left: changer + "%"});
        tracker = (tracker + 20);
    });
    speed += velocity;

    theTravel = requestAnimationFrame(travel);
}

function stopTravel() {
    cancelAnimationFrame(theTravel);
}

$('.Link').on('mouseover', stopTravel).on('mouseout', travel);

travel();
