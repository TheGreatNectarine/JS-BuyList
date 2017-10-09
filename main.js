$(document).ready(function () {
    var LIST = $('.list-of-items');
    var HOLDER_LEFT = $('.products-holder');
    var HOLDER_BOUGHT = $('.items-bought');
    var ITEM_TEMPLATE = $('#product-template').html();
    var PREVIEW_TEMPLATE = $('.preview-template').html();

    $('.add').click(function () {
        var input = $('.input');
        add_item(input.val());
        input.focus();
    });


    function add_item(name) {

        var name_save = name;
        var bought = false;
        var fade_time = 400;
        var $segment = $(ITEM_TEMPLATE);
        var $preview = $(PREVIEW_TEMPLATE);
        $segment.find('.name').text(name);
        $preview.find('.label').text(name);
        $segment.find('#edit').text(name);

        var quantity = 1;

        $segment.find('.delete-button').click(function () {
            $segment.slideUp(fade_time, function () {
                $segment.remove();
            });
            $preview.fadeOut(fade_time, function () {
                $preview.remove();
            });

        });

        $segment.find('#plus').click(function () {
            quantity += 1;
            $preview.find('.circular').html(quantity);
            $segment.find('.quantity-count').fadeOut(fade_time, function () {
                $segment.find('.quantity-count').html(quantity);
                $segment.find('.quantity-count').fadeIn(fade_time, function () {
                })
            });
            console.log(quantity)

        });
        $segment.find('#minus').click(function () {
            if (quantity > 1) {
                quantity -= 1;
                $preview.find('.circular').html(quantity);
                $segment.find('.quantity-count').fadeOut(fade_time, function () {
                    $segment.find('.quantity-count').html(quantity);
                    $segment.find('.quantity-count').fadeIn(fade_time, function () {
                    })
                });
            } else {
            }
            console.log(quantity)

        });

        $segment.find('.bought').click(function () {
            bought = !bought;

            $segment.fadeOut(fade_time, function () {
                if (bought) {
                    $segment.find('.plus').hide();
                    $segment.find('.minus').hide();
                    $segment.find('.delete-button').hide();
                    $segment.find('.bought').text('Not Bought');
                    $segment.find('.bought').attr('data-tooltip', 'Remove from Bought');

                    $preview.fadeOut(fade_time, function () {
                        $segment.find('.name').css('text-decoration', 'line-through');
                        $preview.hide().appendTo(HOLDER_BOUGHT).fadeIn(fade_time);
                    });
                    $preview.find('.label').css('text-decoration', 'line-through');

                } else {
                    $segment.find('.plus').show();
                    $segment.find('.minus').show();
                    $segment.find('.delete-button').show();
                    $segment.find('.bought').text('Bought');
                    $segment.find('.bought').attr('data-tooltip', 'Add to Bought');

                    $preview.fadeOut(fade_time, function () {
                        $segment.find('.name').css('text-decoration', 'none');
                        $preview.hide().appendTo(HOLDER_LEFT).fadeIn(fade_time);
                    });

                    $preview.find('.label').css('text-decoration', 'none');

                }
                $segment.fadeIn(fade_time);
            });
        });


        if (name.replace(/\s/g, '').length) {
            if (name.length > 15) {
                alert('Name is too long.\nUsed ' + name.length + '/' + '15 characters');
            } else {
                $segment.hide().prependTo(LIST).slideDown(fade_time);
                $preview.hide().appendTo(HOLDER_LEFT).fadeIn(fade_time);
            }
        }


        $segment.find('.name').click(function () {
            $segment.find('.name').fadeOut(fade_time / 4, function () {
                $segment.find('#edit').val(name);
                $segment.find('#edit').fadeIn(fade_time / 4).focus();
            });
        });

        $segment.find('#edit').focusout(function () {
            var replacement = $segment.find('#edit').val();
            if (replacement.replace(/\s/g, '').length) {
                if (replacement.length < 15) {
                    $segment.find('#edit').fadeOut(fade_time / 4, function () {
                        $segment.find('.name').text(replacement).fadeIn(fade_time / 4);
                        $preview.find('.label').text(replacement);
                        name = replacement;
                    });
                }
            } else {
                $segment.find('#edit').val(name);
                alert('Invalid changes in name!');
                $segment.find('#edit').focus();
            }
        });

        $('.input').keypress(function (e) {
            if (e.which === 13) {
                add_item($('.input').val());
                return false;
            }
        }).focusout(function () {

        }).val('');
    }


    add_item('Tomatoes');
    add_item('Cookies');
    add_item('Cheese');
});

