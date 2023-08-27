$(document).ready(() =>{    
    $('#header').load('/template/header/header.html', ()=>{
      $('#headerAboutUs')
        .removeClass()
        .addClass("nav-link active text-black fw-bold")
    });

    $("#footer").load("/template/footer/footer.html", ()=>{
      $("#footerAboutUs")
        .removeClass()
        .addClass("nav-link active text-black fw-bold");
    });
});