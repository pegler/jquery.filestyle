/* Style File - jQuery plugin for styling file input elements
 *  
 * Copyright (c) 2007-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Based on work by Shaun Inman
 *   http://www.shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom
 *
 */

(function($) {
    
    $.fn.filestyle = function(options) {
                
        /* TODO: This should not override CSS. */
        var settings = {
            width : 250,
            buttonText: 'Choose File',
            width: 88,
            height: 28,
            tabIndex: false
        };
                
        if(options) {
            $.extend(settings, options);
        };
                        
        return this.each(function() {
            
            var self = this;
            
            input = $(this);
            
            var outerWrapper = $("<div>").addClass('filestyle');
            
            var button = $("<div>").css({
            	"position": "relative"
            }).addClass('fileButton');
            if (settings.image) {
            	button.css({
                                "width": settings.width + "px",
                                "height": settings.height + "px",
                                "background": "url(" + settings.image + ") 0 0 no-repeat",
                                "background-position": "right",
                                "display": "inline",
                                "position": "absolute",
                                "overflow": "hidden"
                            });
            } else {
                button.text(settings.buttonText).css({
                                "display": "inline",
                                "position": "absolute",
                                "overflow": "hidden",
                                "width": settings.width + 'px',
                                "height": settings.height + 'px',
                                "text-align": "center",
                                "line-height": settings.height + 'px'
                });
            }

            if (settings.tabIndex != false) {
                button.attr('tabIndex', settings.tabIndex)   
            }

            var filename = $('<input class="file" READONLY/>')
                             .addClass($(self).attr("class"))
                             .attr('tabIndex', 999)
                             .css({
                                 "display": "inline",
                             }).addClass('fileName');

			$(self).wrap(outerWrapper);
			$(self).wrap(button);
			$(self).parent().parent().prepend(filename);

            $(self).css({
                        "position": "absolute",
                        "top": 0,
                        "left": 0,
                        "height": settings.height + "px",
                        "width": settings.width + "px",
                        "display": "inline",
                        "cursor": "pointer",
                        "opacity": "0.0"
                    });

            if ($.browser.mozilla) {
                if (/Win/.test(navigator.platform)) {
                    $(self).css("margin-left", "-142px");                    
                } else {
                    $(self).css("margin-left", "-168px");                    
                };
            } else {
                $(self).css("margin-left", settings.imagewidth - settings.width + "px");                
            };

            $(self).bind("change", function() {
            	v = $(self).val();
            	if (v.indexOf('C:\\fakepath\\') == 0)
            		v = v.substring(12);
                filename.val(v);
            });
      
        });
        

    };
    
})(jQuery);
