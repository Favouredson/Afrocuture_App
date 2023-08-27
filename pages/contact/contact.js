$(document).ready(() =>{
    $('#header').load('/template/header/header.html', ()=>{
      $('#headerContactUs')
        .removeClass()
        .addClass("nav-link active text-black fw-bold")
    });

    $("#footer").load("/template/footer/footer.html", ()=>{
      $("#footerContactUs")
        .removeClass()
        .addClass("nav-link active text-black fw-bold");
    });
});