(function ($) {
    'use strict';

    let thisPage = 1;
    let limit = 8;
    let $list = $('#list .item');
    let totalPages = Math.ceil($list.length / limit);

    function loadItem() {
        let beginGet = limit * (thisPage - 1);
        let endGet = limit * thisPage - 1;
        $list.each(function (index, item) {
            if (index >= beginGet && index <= endGet) {
                $(item).show();
            } else {
                $(item).hide();
            }
        });
        listPage();
    }

    function listPage() {
        $('.listPage').empty();

        // Nút First và Prev
        if (thisPage > 1) {
            $('.listPage').append($('<li>').html('<i class="fa-solid fa-angles-left"></i>').attr('onclick', 'changePage(1)'));
            $('.listPage').append(
                $('<li>')
                    .html('<i class="fa-solid fa-angle-left"></i>')
                    .attr('onclick', `changePage(${thisPage - 1})`)
            );
        } else {
            $('.listPage').append($('<li>').html('<i class="fa-solid fa-angles-left"></i>').addClass('disabled'));
            $('.listPage').append($('<li>').html('<i class="fa-solid fa-angle-left"></i>').addClass('disabled'));
        }

        // Hiển thị các trang đầu, dấu ba chấm, và các trang cuối
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                addPageButton(i);
            }
        } else {
            if (thisPage <= 3) {
                for (let i = 1; i <= 3; i++) {
                    addPageButton(i);
                }
                $('.listPage').append($('<li>').text('...').addClass('disabled'));
                addPageButton(totalPages - 1);
                addPageButton(totalPages);
            } else if (thisPage >= totalPages - 2) {
                addPageButton(1);
                addPageButton(2);
                $('.listPage').append($('<li>').text('...').addClass('disabled'));
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    addPageButton(i);
                }
            } else {
                addPageButton(1);
                addPageButton(2);
                $('.listPage').append($('<li>').text('...').addClass('disabled'));
                addPageButton(thisPage - 1);
                addPageButton(thisPage);
                addPageButton(thisPage + 1);
                $('.listPage').append($('<li>').text('...').addClass('disabled'));
                addPageButton(totalPages - 1);
                addPageButton(totalPages);
            }
        }

        // Nút Next và Last
        if (thisPage < totalPages) {
            $('.listPage').append(
                $('<li>')
                    .html('<i class="fa-solid fa-angle-right"></i>')
                    .attr('onclick', `changePage(${thisPage + 1})`)
            );
            $('.listPage').append($('<li>').html('<i class="fa-solid fa-angles-right"></i>').attr('onclick', `changePage(${totalPages})`));
        } else {
            $('.listPage').append($('<li>').html('<i class="fa-solid fa-angle-right"></i>').addClass('disabled'));
            $('.listPage').append($('<li>').html('<i class="fa-solid fa-angles-right"></i>').addClass('disabled'));
        }
    }

    function addPageButton(pageNumber) {
        let $page = $('<li>').text(pageNumber);
        if (pageNumber === thisPage) {
            $page.addClass('active');
        } else {
            $page.attr('onclick', `changePage(${pageNumber})`);
        }
        $('.listPage').append($page);
    }

    window.changePage = function (i) {
        thisPage = i;
        loadItem();
    };

    $(document).ready(function () {
        loadItem();
    });
})(jQuery);
