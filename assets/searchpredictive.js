
$(function() {

 var currentAjaxRequest = null;
 var searchForms = $('form[action="/search"]').each(function() {
     var input = $(this).find('input[name="q"]');
     $('<div id="barritabuscador" class="contsearchpredictive"></div>').appendTo($(this));

     input.attr('autocomplete', 'off').bind('keyup change', function() {

         var term = $(this).val();
         var form = $(this).closest('form');
         var searchURL = '/search?type=product&q=' + term;
         var resultsList = form.find('.contsearchpredictive');

         if (term.length > 0 && term != $(this).attr('data-old-term')) {

             $(this).attr('data-old-term', term);

             if (currentAjaxRequest != null) currentAjaxRequest.abort();
             var ajaxData = {
                 "resources": {
                     "type": 'product',
                     "limit": 6,
                     "options": {
                         "unavailable_products": 'last',
                         "fields": 'title,product_type,variants.title'
                     }
                 }
             };
             var url2 = '&resources[type]=product'
             currentAjaxRequest = $.getJSON({
                 'url': "/search/suggest.json?q=" + term + url2,
                 'type': 'GET',
                 'dataType': 'json',
                 data: ajaxData,
                 'success': function(data) {
                     resultsList.empty();
                     if (data.resources.results.products.length == 0) {
                         resultsList.hide();
                     } else {
                   //productos
                         $.each(data.resources.results.products, function(index, item) {
                             var link = $('<a class="itemrecomend w-inline-block"></a>').attr('href', item.url);
                             var containerinfo = $('<div id="w-node-_977826da-9edd-e5c7-8ce0-63dfcb1f0bbd-ea8a835a" class="w-layout-layout quick-stack wf-layout-layout"></div>')
                             var image_url = item.featured_image.url;
                             if (image_url !== null) {
                                 var extension = image_url.split('.').pop();
                                 var image = image_url.replace('.' + extension, '_thumb') + '.' + extension;
                             } else {
                                 var image = 'https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_40x.gif'
                             }
                             containerinfo.append('<div class="w-layout-cell cellpicrecomend"><img src="' + image + '" class="picrecomend" /></div>');
                             containerinfo.append('<div class="w-layout-cell cellnamerecomend"><div class="namerecomend">' + item.title + '</div></div>');
                             link.append(containerinfo);
                             link.wrap('<div class="pred-item"></div>');
                             resultsList.append(link.parent());
                         });
                         // if(data.resources.results.products.length+data.resources.results.collections.length > 10) {
                         resultsList.append('<div class="pred-item"><span class="title all-results"><a href="' + searchURL + '" class="itemrecomend w-inline-block">Ver todos los resultados</a></span></div>');
                         // }

                         resultsList.fadeIn(200);
                     }
                 }
             });
         }
     });
 });

 $('body').bind('click', function() {
     $('.contsearchpredictive').hide();
 });

});