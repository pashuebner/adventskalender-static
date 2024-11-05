const now = new Date();
const day = ("0" + now.getDate()).slice(-2);
const month = now.getMonth();

const middlePos = 32;
const totalheight = 32 * (day-2);
let i = 1;

var startScroll;

$(document).ready(function() {
    // Click event for any anchor tag that's href starts with #
    $('a[href^="#"]').click(function(event) {

        // The id of the section we want to go to.
        var id = $(this).attr("href");

        // An offset to push the content down from the top.
        var offset = 0;

        // Our scroll target : the top position of the
        // section that has the id referenced by our href.
        var target = $(id).position().top - offset;
        console.log(target);
        // The magic...smooth scrollin' goodness.
        $('.content').animate({scrollTop:$('.content').scrollTop()+target}, 500);

        //prevent the page from jumping down to our section.
        event.preventDefault();
    });
    calender();
});

var position = $(window).scrollTop(); 

// should start at 0

var wHeight = $(window).height();
$('.index').scroll(function(event){
   var st = $(this).scrollTop();
   console.log((st/wHeight));
   $('.overlay').attr('style', 'opacity: '+ (st/wHeight)*1.5 +'!important;');
   if (st > wHeight*0.4){
       // downscroll code
       $('body').addClass('scrolled');
   } else {
      // topscroll code
      $('body').removeClass('scrolled');
   }
});
$('.content').scroll(function(event){
    $('body').removeClass('nav-open');
})

$('.burger-wrap').click(function(){
    $('body').toggleClass('nav-open');
})

function calender(){
    $('.close').click(function(){
        $('.modal').each(function(){
            $('.modal.active').removeClass('active');
        })
    })
    $('.kalender-grid > div').each(function(){
        $(this).click(function(){
            $('.modal').each(function(){
            $('.modal.active').removeClass('active');
        })
            let cnum = $(this).text();
            $('#km'+cnum).addClass('active');    
        })
    })
}