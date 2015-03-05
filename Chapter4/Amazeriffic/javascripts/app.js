/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

/*var main = function() {
    "use strict";
    
    var makeTabActive = function (tabNumber) {
        // make all the tabs inactive
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
        $(".tabs span").removeClass("active");
        $(tabSelector).addClass("active");
        $("main .content").empty();
    };

    $(".tabs a:nth-child(1)").on("click", function () { 
        makeTabActive(1);
        return false;
    });

    $(".tabs a:nth-child(2)").on("click", function () { 
        makeTabActive(2);
        return false;
    });

    $(".tabs a:nth-child(3)").on("click", function () { 
        makeTabActive(3);
        return false;
    });

};*/

/*Ask about the spaces on the JSLint*/

var main = function () { 
    "use strict";

    var toDos = [
        "Finish writing this book", 
        "Take Gracie to the park", 
        "Answer emails",
        "Prep for Monday's class", 
        "Make up some new ToDos", 
        "Get Groceries"
    ];


    $(".tabs a span").toArray().forEach(function (element) { 
    // create a click handler for this element 
        $(element).on("click", function () {
        // since we're using the jQuery version of element, 
        // we'll go ahead and create a temporary variable 
        // so we don't need to keep recreating it
        var $element = $(element);
        var $content;
        var $button;
        var $input;  

        
        $(".tabs a span").removeClass("active"); 
        $(element).addClass("active");
        $("main .content").empty();

        if ($(element).parent().is(":nth-child(1)")) { 
            $content = $("<ul>");
            var index;
            for(index = toDos.length - 1; index >= 0 ; index = index - 1) {
                $content.append($("<li>").text(toDos[index]));

            }
            $("main .content").append($content);

        } else if ($element.parent().is(":nth-child(2)")) { 
            $content = $("<ul>");
            toDos.forEach(function (todo) {
                $content.append($("<li>").text(todo));
            }); 
            $("main .content").append($content);

        } else if ($element.parent().is(":nth-child(3)")) { 
            $input = $("<input>");
            $button = $("<button>");
            $("main .content").append($input);
            $("main .content").append($button.text("+"));
            
            var addActivityFromInputBox = function () {
                
                if($("main .content input").val() !== "") {
                    toDos.push($("main .content input").val());
                    $("main .content input").val("");
                }
            }; 
            
            $("main .content button").on("click", function () {
                addActivityFromInputBox();
            });
        

        }   else if ($element.parent().is(":nth-child(4)")) {
                $content = $("<ul>");
                $content.append(("<li><p><a class='group4' href='images/1.png'>Screenshot 1</a></p></li>"));
                $content.append(("<li><p><a class='group4' href='images/2.png'>Screenshot 2</a></p></li>"));
                $content.append(("<li><p><a class='group4' href='images/3.png'>Screenshot 3</a></p></li>"));
                $content.append(("<li><p><a class='group4' href='images/4.png'>Screenshot 4</a></p></li>"));
                $("main .content").append($content);
                
                
        }


        return false;

        
        }); 

    
    });

    $(".tabs a:first-child span").trigger("click");
        
    
    
};
$(document).ready(main);












