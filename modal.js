(function($) {
    var modal = function(settings){
        var modal = {},
            $overlay,
            $modal,
            $content,
            $close;

        $overlay = $('<div class="overlay"></div>');
        $modal = $('<div class="modal ' + settings.cssClass +' "></div>');
        $content = $('<div class="content '+ settings.cssClass +' "></div>');
        $close = $('<a class="close" href="#">close</a>');
        $modal.append($content, $close);
        
        // Open the modal
        var open = function (settings) {
            //append modal window to the document
            settings.target.append($overlay, $modal);
            $overlay.append($modal);
            $close.click(function(e){
                e.preventDefault();
                modal.close();
            });

            $content.empty().append(settings.content);

            $modal.show();
            $overlay.show();
            
            modal.center();
            // resize and center the modal window if viewport changed
            $(window).bind('resize.modal', modal.center);

            
        };

        // Center the modal in the viewport
        modal.center = function () {
            var top, left;
            top = Math.max($overlay.height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($overlay.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top:top,
                left:left
            });
        };

        

        // Close the modal
        modal.close = function () {
            $modal.hide();
            $overlay.hide();
            $content.empty();
            $(window).unbind('resize.modal');
            $overlay.remove();
        };
        // Open the modal window on initialize
        open(settings);

        return modal;
    };

    $.extend({modal:modal});
}(jQuery));