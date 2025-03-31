let i = 1;

var startScroll;

$(document).ready(function () {
  // Click event for any anchor tag that's href starts with #
  $('a[href^="#"]').click(function (event) {
    // The id of the section we want to go to.
    var id = $(this).attr("href");

    // An offset to push the content down from the top.
    var offset = 0;

    // Our scroll target : the top position of the
    // section that has the id referenced by our href.
    var target = $(id).position().top - offset;
    // The magic...smooth scrollin' goodness.
    $(".content").animate(
      { scrollTop: $(".content").scrollTop() + target },
      500
    );

    //prevent the page from jumping down to our section.
    event.preventDefault();
  });
  calender();
  checkNumber();
});

function checkNumber() {
  if ($(".kalender-grid")[0]) {
    var gNumbers = [];
    const numberElem = $(".modal table tr");
    numberElem.each(function () {
      var gNumbersAdd = {
        price: $(this).find("td").eq(0).text().trim(),
        value: $(this).find("td").eq(1).text().trim(),
        number: $(this).find("td").eq(2).text().trim(),
      };
      gNumbers.push(JSON.stringify(gNumbersAdd));
    });
    console.log(gNumbers);
    $(".checkNumberSubmit").click(function () {
      let inputVal = $(".checkNumber").val().trim();
      let match = gNumbers.find((item) => {
        let obj = JSON.parse(item);
        return parseInt(obj.number) === parseInt(inputVal);
      });
      if (match) {
        let matchedObj = JSON.parse(match);
        $(".checkResult > div").html(
          `<h2>Gewonnen!</h2><p><strong>${matchedObj.price}</strong> </br>im Wert von <strong> ${matchedObj.value}</strong></br> <i>Letzte Chance zur Abholung in der Sparkassenpassage in Kaufbeuren am 22.02. zwischen 10 und 13 Uhr</i></p>`
        );
        $(".checkResult").fadeIn("fast").css("display", "flex");
      } else {
        $(".checkResult > div").html("<p>Leider kein Gewinn gefunden</p>");
        $(".checkResult").fadeIn("fast").css("display", "flex");
      }
    });
    $(".checkNumber").keypress(function (e) {
      if (e.which == 13) {
        $(".checkNumberSubmit").click();
      }
    });
    $(".checkResult > span").click(function () {
      $(".checkResult").fadeOut("fast");
    });
  }
}

var position = $(window).scrollTop();

// should start at 0
var wWidth = $(window).width();
var wHeight = $(window).height();

$(".index").scroll(function (event) {
  var st = $(this).scrollTop();
  if (st > wHeight * 0.25) {
    // downscroll code
    $(".overlay").attr("style", "opacity: " + 1 + "!important;");
    $("body").addClass("scrolled");
  } else {
    // topscroll code
    $(".overlay").attr("style", "opacity: " + 0 + "!important;");
    $("body").removeClass("scrolled");
  }
});
$(".content").scroll(function (event) {
  $("body").removeClass("nav-open");
});

$(".burger-wrap").click(function () {
  $("body").toggleClass("nav-open");
});

function calender() {
  $(".close").click(function () {
    $(".modal").each(function () {
      $(".modal.active").removeClass("active");
    });
  });
  $(".kalender-grid > div").each(function () {
    $(this).click(function () {
      $(".modal").each(function () {
        $(".modal.active").removeClass("active");
      });
      let cnum = $(this).text();
      if ($("#km" + cnum)[0]) {
        $("#km" + cnum).addClass("active");
      }
    });
  });
}
