console.log("scripts.js loaded");


$(document).ready(function(){

  var overlayType = ""

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

  var commissions = [["familyCommission.jpg","Family Commission"],["cuteKidCommission.jpg","Cute Kid Commission"]],
      commissionsArray = []


  //put images into an array
  for (var i = 0; i < images.length; i ++ ) {
    galleryArray.push("../images/"+images[i][0])
  }
  for (var i = 0; i < commissions.length; i ++ ) {
    commissionsArray.push("../images/"+commissions[i][0])
  }

  var cols = $("#indexGallery .col-3")
  var imgInfos = $("#indexGallery .info")
  var infoPs = $("#indexGallery .info p")
  for (var i = 0; i < cols.length; i++){
    cols[i].style.backgroundImage = `url("${galleryArray[i]}")`
    cols[i].style.backgroundPosition = 'center'
    cols[i].style.backgroundSize = ` 100%`
    cols[i].style.backgroundRepeat = `no-repeat`
    var info = imgInfos[i]
    $(infoPs[i]).html(images[i][1])
  }

  var commissionCols   = $('#commissionDiv .col-3'),
      commissionInfos  = $("#commissionDiv .info"),
      commissionInfoPs = $("#commissionDiv .info p")
  for (var i = 0; i < commissionCols.length; i++ ) {
    commissionCols[i].style.backgroundImage = `url("${commissionsArray[i]}")`
    commissionCols[i].style.backgroundPosition = 'center'
    commissionCols[i].style.backgroundSize = ` 100%`
    commissionCols[i].style.backgroundRepeat = `no-repeat`
    var info = commissionInfos[i];
    $(commissionInfoPs[i]).html(commissions[i][1])
  }

  var overlay = false;
  var currentPic

  $('#indexGallery .col-3').on("click",function(){
    overlayType = "gallery"
    var val = $(this).attr("value")
    currentPic = val
    $('.overlay-image').attr("src","../images/"+images[currentPic][0])

    $(".overlay-image-description").text(`${images[val][1]}`)

    $(".overlay").fadeIn()
    overlay = true;

    $(".overlay-arrow").css("line-height",$(".overlay-image-container").height()+"px")
  })

  $('#commissionDiv .col-3').on("click",function(){
    overlayType = "commissions"
    var val = $(this).attr("value")
    currentPic = val
    $('.overlay-image').attr("src","../images/"+commissions[currentPic][0])

    $(".overlay-image-description").text(`${commissions[val][1]}`)

    $(".overlay").fadeIn()
    overlay = true;

    $(".overlay-arrow").css("line-height",$(".overlay-image-container").height()+"px")
  })

  $(".close-overlay").on("click",function(){
    overlay = false;
    overlayType = ""
    $(".overlay").fadeOut()
  })

  $(".overlay").hide()


  function nextPic(){

    var pics = []
    var piclength = 0;

    if (overlayType == "gallery") {
      pics = images;
      piclength = 5;
    }

    if (overlayType == "commissions") {
      pics = commissions
      piclength = 1
    }


    if (currentPic < piclength) {
      currentPic ++ ;
    } else {
      currentPic = 0;
    }

    $(".overlay-image").fadeOut(100,function(){
      $('.overlay-image').attr("src","../images/"+pics[currentPic][0])
      $(".overlay-image").fadeIn()
    })
    $(".overlay-image-description").fadeOut(100,function(){
      $('.overlay-image-description').text(pics[currentPic][1])
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
       overlayType = ""
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
