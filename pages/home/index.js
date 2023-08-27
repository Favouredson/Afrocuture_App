$(document).ready(() =>{
    $('#header').load('/template/header/header.html', ()=>{
      $('#headerHome')
        .removeClass()
        .addClass("nav-link active text-black fw-bold")
    });

    $("#footer").load("/template/footer/footer.html", ()=>{
      $("#footerHome")
        .removeClass()
        .addClass("nav-link active text-black fw-bold");
    });
  });