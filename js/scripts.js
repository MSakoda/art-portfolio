console.log("scripts.js loaded");


$(document).ready(function(){

  function scrollTo(anchor){
      $('html, body').animate({
          scrollTop: $("#"+anchor).offset().top
      },1000 );
  }

  $("#backToTop").on("click",function(){
    scrollTo("jonBanner")
  })

  $("#arrowDown").on("click",function(){
    scrollTo("indexGallery")
  })

  $("#arrowDown2").on("click",function(){
    scrollTo("commissionDiv")
  })

  $("#arrowDown3").on("click",function(){
    scrollTo("contactDiv")
  })

  $("#about").on("click",function(){
    console.log("you clicked about");
  })
  $("#gallery").on("click",function(){
    console.log("you clicked gallery");
  })
  $("#commission").on("click",function(){
    console.log("you clicked commission");
  })

  var galleryArray = []

  var images = [
    ["michelle.jpeg","Michelle Obama"],
    ["jonSnowMarcusSakoda.jpeg","Jon Snow"],
    ["DarylMarcusSakoda.jpeg","Daryl Dixon"],
    ["ramiMalekMarcusSakoda.jpg","Mr. Robot"],
    ["stephCurryMarcusSakoda.jpeg","Stephen Curry"],
    ["leoDiCaprioMarcusSakoda.jpeg","Leonardo DiCaprio"]
  ]

  //put images into an array
  for (var i = 0; i < images.length; i ++ ) {
    galleryArray.push("../images/"+images[i][0])
  }

  // var indexGallery = $('#indexGallery')
  // console.log("indexGallery is:",indexGallery);
  var cols = $("#indexGallery .col-3")
  var imgInfos = $("#indexGallery .info")
  var infoPs = $(".info p")
  for (var i = 0; i < cols.length; i++){
    cols[i].style.backgroundImage = `url("${galleryArray[i]}")`
    cols[i].style.backgroundPosition = 'center'
    cols[i].style.backgroundSize = ` 100%`
    cols[i].style.backgroundRepeat = `no-repeat`
    var info = imgInfos[i]
    $(infoPs[i]).html(images[i][1])
  }

  var overlay = false;
  var currentPic

  $('.col-3').on("click",function(){
    var val = $(this).attr("value")
    currentPic = val
    $('.overlay-image').attr("src","../images/"+images[currentPic][0])

    $(".overlay-image-description").text(`${images[val][1]}`)

    $(".overlay").fadeIn()
    overlay = true;

    $(".overlay-arrow").css("line-height",$(".overlay-image-container").height()+"px")
  })

  $(".close-overlay").on("click",function(){
    overlay = false;
    $(".overlay").fadeOut()
  })

  $(".overlay").hide()

  function nextPic(){
    if (currentPic < 5) {
      currentPic ++ ;
    } else {
      currentPic = 0;
    }
    $(".overlay-image").fadeOut(100,function(){
      $('.overlay-image').attr("src","../images/"+images[currentPic][0])
      $(".overlay-image").fadeIn()
    })
    $(".overlay-image-description").fadeOut(100,function(){
      $('.overlay-image-description').text(images[currentPic][1])
      $('.overlay-image-description').fadeIn()
    })
  }

  function prevPic(){
    if (currentPic < 1){
      currentPic = 5
    } else {
      currentPic -= 1
    }
    $(".overlay-image").fadeOut(100,function(){
      $('.overlay-image').attr("src","../images/"+images[currentPic][0])
      $(".overlay-image").fadeIn();
    })

    $(".overlay-image-description").fadeOut(100,function(){
      $('.overlay-image-description').text(images[currentPic][1])
      $('.overlay-image-description').fadeIn()
    })
  }

  $(".overlay-arrow").on("click",function(){
    if ($(this).attr("value")=="next") {
      nextPic()
    } else {
      prevPic()
    }
  })

  $(document).keyup(function(e) {
    // escape closes overlay
    if (e.keyCode == 27 && overlay == true) {
       $(".overlay").fadeOut();
       overlay = false;
    }

    //left
    if (e.keyCode == 37 && overlay == true) {
      prevPic()
    }

    // right
    if (e.keyCode == 39 && overlay == true) {
      nextPic()
    }

  });





})
