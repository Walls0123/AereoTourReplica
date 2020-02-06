$(document).ready(function () {
    //Slider Presentation
    var slideIndex = 0;
    carrucel()
    function carrucel() {
        let arrayImg = $('.slide');
        for (let i = 0; i < arrayImg.length; i++) {
            $(arrayImg[i]).css('display', 'none')
        }
        slideIndex++;
        if (slideIndex > arrayImg.length) {
            slideIndex = 1
        }
        $(arrayImg[slideIndex - 1]).css('display','block')
        setTimeout(carrucel, 5000   )
    }
    $("#searchorigen").autocomplete({
        source:function(req,res){
            console.log(this)
            $.get('http://localhost:3001/get/'+this.element[0].value,{
                query:req
            },function(data){
                res(data.todos)
            })
        }
        ,
        select:function(e,ui){
            e.preventDefault();
            $("#searchorigen").val(ui.item.label)
        }
    })
    //Get Values Autocomplete Destino
    $("#searchdestino").autocomplete({
        source:function(req,res){
            console.log(this)
            $.get('http://localhost:3001/get/'+this.element[0].value,{
                query:req
            },function(data){
                res(data.todos)
            })
        }
        ,
        select:function(e,ui){
            e.preventDefault();
            $("#searchdestino").val(ui.item.label)
        }
    })
    //Value date 
    // $('#fechaorigen').val('2020-02-04')
    // $('#fecharegreso').val('2020-02-06')
    //Form Send Values
    $('#formreserva').submit(function(){

    })
})