var MyApp = MyApp || {};

MyApp.AppSPUtils = function () {

    var GetParameter = function (paramToRetrieve) {
        var params =
                document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return decodeURIComponent(singleParam[1]);
        }
    }

    var RenderChrome = function (appName) {

        var siteActivityLanguage = GetParameter("SPLanguage");

        // The Help, Account and Contact pages receive the 
        //   same query string parameters as the main page
        var options = {
            "appTitle": appName,
            "language": siteActivityLanguage
        };

        var nav = new SP.UI.Controls.Navigation("chrome_ctrl_placeholder", options);
        nav.setVisible(true);


    }


    var LoadLanguage = function () {
        $("*[data-language]").each(function () {

            var element = $(this);

            switch (element.get(0).tagName) {
                case "INPUT":
                    element.attr("placeholder", MyApp.language[element.attr("data-language")]).blur();
                    break;
                case "BUTTON":
                default:
                    element.html(MyApp.language[element.attr("data-language")]);
                    break;
            }
        });
    }

    return {
        UTCDelayConvert: function(delay){
            return delay * (-1) / 60;
        },

        GetQueryStringParameter : function(paramToRetrieve) {
            return GetParameter(paramToRetrieve);
        },

        RedirectApp : function (page) {
            window.open(page + "?" + document.URL.split("?")[1], "_self");

        },

        RenderAppNav: function (appName) {
            RenderChrome(appName);
        },

        RenderLanguage: function () {

            $.ajaxSetup({
                error: function (x, e) {
                    $.get("../Scripts/resources/en.js", function () {
                        LoadLanguage();
                        deferred.resolve();
                    })
                
                }
            });

            var deferred = $.Deferred();

            var language = GetParameter("SPLanguage");

            $.get("../Scripts/resources/" + language + ".js",function()
            {
                LoadLanguage();
                deferred.resolve();
            })

            return deferred.promise();
        }
        
    }
}();