$(document).ready(function() {
    /* Floating Label */
    $('.search-movie input').on('focus', function(){
        $(this).parent().children("label").addClass("animatelabel");
    });
    $('.search-movie input').on('blur', function(){
        if($(this).val() == ""){
            $(this).parent().children("label").removeClass("animatelabel");
        }else{
            $(this).parent().children("label").addClass("animatelabel");
        }	
    });
    /* Floating Label */

    /* Sticky header */
    var distance = $('.search-movie').offset().top;

    $(window).scroll(function() {
        if ( $(this).scrollTop() >= distance - 30) {
             $('.main-bg').addClass('fixed');
        } else {
             $('.main-bg').removeClass('fixed');
        }
    });
    /* Sticky header */

    /* OMDB API */
    var myapikey = "98590b39" ; /* You can use any verified OMDB API key here */

    /* Highlight searched text */
    function highlight(word, query) {
        let check = new RegExp(query, "ig")
        return word.toString().replace(check, function(matchedText) {
            return "<span>" + matchedText + "</span>"
        })
    }
    
    $(".result-list").hide()
    $(".result-number").hide()
    $(".no-reults").hide()
    $(".search-input").keyup(function() {
        let search = $(this).val()
        let results = ""
        if (search == "") {
            $(".result-list").hide()
            $(".result-number").hide()
            $(".no-reults").show()
        } else {
            $(".result-number").show()
            $(".no-reults").hide()
                
        }
        $.getJSON("https://www.omdbapi.com/?", { apikey: myapikey, s: search }, function(data) {
                if (data.Search !== undefined) {
                    $.each(data.Search, function(index, value) {
                            $.getJSON("https://www.omdbapi.com/?", { apikey: myapikey, i: value.imdbID }, function(movieData) {
                                if (movieData) {
                                    results += '<div class="result">'
                                    results += '<div class="poster"><img src=' + movieData.Poster + '/></div>'
                                    results += '<div class="maininfo">'
                                    results += '<h3>'+ highlight(movieData.Title, $(".search-input").val()) + ' ('+ movieData.Year +')</h3>'
                                    results += '<p class="rating"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><polygon points="256 12.53 335.11 172.82 512 198.53 384 323.29 414.21 499.47 256 416.29 97.78 499.47 128 323.29 0 198.53 176.89 172.82 256 12.53" fill="#434040"/></svg> <span>' + movieData.imdbRating +' / 10</span></p>'
                                    results += '<p class="language"><span>Languages : </span>'+ movieData.Language + '</p>'
                                    results += '</div>'
                                    results += '<div class="cast">'
                                    results += '<p><span>Cast : </span>'+ movieData.Actors + '</p>'
                                    results += '</div>'
                                    results += '<div class="details">'
                                    results += '<p>' + movieData.Plot + '</p>'
                                    results += '<span class="viewmore"><span class="expandtext">More details</span><span class="hidetext">Hide details</span></span>'
                                    results += '</div>'
                                    results += '</div>'
                                    $(".result-list").html(results)
                                    var totalItems = $('.result').length;
                                    $(".result-number #list-count").html(totalItems)
                                    
                                }
                            })
                    });
                    $(".result-list").show();
                   
                    /* Toggle details */
                    setTimeout(function() {
                    $(".viewmore").click(function(){
                        $(this).toggleClass('expandactive');
                        $(this).parent().children("p").slideToggle('slow').setTimeout(1500);
                    });
                    }, 1500);
                }
            });
        });
});