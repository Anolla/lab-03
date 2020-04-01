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
                animal.list();
                renderSelection();
            });
        });
    };
    readJson(1);
    let uiniqueKey = [];
    Image.prototype.list = function() {
        if (!uiniqueKey.includes(this.keyword)) {
            uiniqueKey.push(this.keyword)
            let $newOption = $('<option></option>');
            $('select').append($newOption);
            $($newOption).text(this.keyword);
            $($newOption).attr('value', this.keyword);
        }
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
            readJson(1);
        })
        $('#button2').on('click', function() {
            readJson(2);
        })
    }
    pageRender();
});