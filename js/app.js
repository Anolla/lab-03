'use strict';
$(document).ready(function() {
    function Image(animal) {
        this.title = animal.title;
        this.image_url = animal.image_url;
        this.description = animal.description;
        this.keyword = animal.keyword;
        this.horns = animal.horns;
        Image.all.push(this);
    }
    Image.all = []
    Image.prototype.render = function() {
        let $animalClone = $('#photo-template').html();
        var rendered = Mustache.render($animalClone, this);
        $('#horns-rendered').append(rendered);
    };
    const readJson = (pageNum) => {
        $('#horns-rendered').html('');
        $.ajax(`data/page-${pageNum}.json`, { method: 'GET', dataType: 'JSON' }).then(data => {
            data.forEach(animalItem => {
                let animal = new Image(animalItem);
                animal.render();
                renderSelection();
            });
            list();
        });
    };
    readJson(1);


    let uiniqueKey = [];


    function list() {
        // console.log(uiniqueKey);
        uiniqueKey = [];
        $('select').empty();
        $('select').append($('<option>Filter by Keyword</option>'));
        // this function can be a prototype as well. (instead of val, pass this)
        Image.all.forEach(val => {
                if (!uiniqueKey.includes(val.keyword)) {
                    uiniqueKey.push(val.keyword)
                    let $newOption = $('<option></option>');
                    $('select').append($newOption);
                    $($newOption).text(val.keyword);
                    $($newOption).attr('value', val.keyword);

                }
            })
            // console.log(uiniqueKey);
    }

    const renderSelection = () =>
        $('select').on('change', () => {
            let selectValue = $('select').val();
            $(' #horns-rendered section').hide();
            $(`.${selectValue}`).show();
        })
    renderSelection();


    function pageRender() {
        $('#button1').on('click', function() {
            Image.all = [];
            readJson(1);
            // console.log(option1);

        })
        $('#button2').on('click', function() {
            Image.all = [];
            readJson(2);
            // console.log(option2);

        })
    }
    pageRender();

    function sortBy(array, property) {
        array.sort((a, b) => {
            let firstItem = a[property];
            let secondItem = b[property];
            if (property === 'title') {
                firstItem = firstItem.toUpperCase();
                secondItem = secondItem.toUpperCase();
            }

            if (firstItem > secondItem) {
                return 1;

            } else if (firstItem < secondItem) {
                return -1;
            } else { return 0; }


        })

    }

    $("#radio1").on('click', () => {
        sortBy(Image.all, 'title');
        $('#horns-rendered').html('');
        Image.all.forEach(image => image.render());

    })


    $("#radio2").on('click', () => {
        sortBy(Image.all, 'horns')
        $('#horns-rendered').html('');
        Image.all.forEach(image => image.render());
    })

    // renderSelection();


});