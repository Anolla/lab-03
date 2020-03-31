'use strict'

'use strict'

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
        // console.log(Image.all);

    function Image2(animal2) {
        this.title = animal2.title;
        this.image_url = animal2.image_url;
        this.description = animal2.description;
        this.keyword = animal2.keyword;
        this.horns = animal2.horns;
        Image2.all.push(this);
    }

    Image2.all = []
        // for (let i = 0; i < Image.all.length; i++) {
        //     if (uiniqueKey.includes(Image.all[i].keyword)) {
        //         continue;
        //     } else {
        //         uiniqueKey.push(Image.all[i].keyword);
        //     }

    // }
    Image.prototype.render = function() {
        let $animalClone = $("#photo-template").html();
        var rendered = Mustache.render($animalClone, this);
        $('main').append(rendered);
        // let $animalClone = $("#photo-template").clone();
        // $animalClone.find("h2").text(this.title);
        // $animalClone.find("img").attr("src", this.image_url);
        // $animalClone.find("p").text(this.description);
        // $animalClone.attr("id", this.title);
        // $animalClone.removeAttr('id');
        // $animalClone.attr('class', this.keyword);
        // $('main').append($animalClone);
    };

    Image2.prototype.render = function() {
        let $animalClone2 = $("#photo-template").html();
        var rendered2 = Mustache.render($animalClone2, this);
        $('main').append(rendered2);
    };

    const readJson = () => {
        $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(animalItem => {
                let animal = new Image(animalItem);
                animal.render();
                animal.list();
                renderSelection();
                // animal.pageRender();
            });
        });
    };
    readJson();

    const readJson2 = () => {
        $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(animalItem2 => {
                let animal2 = new Image2(animalItem2);
                animal2.render();
                animal2.list();
                renderSelection();
            });
        });
    };
    readJson2();





    let uiniqueKey = [];
    Image.prototype.list = function() {

        if (!uiniqueKey.includes(this.keyword)) {
            uiniqueKey.push(this.keyword)
                // console.log(this);
            let $newOption = $('<option></option>');
            $('select').append($newOption);
            $($newOption).text(this.keyword);
            $($newOption).attr('value', this.keyword);
        }
        // $('select').attr('id', this.keyword);
    }

    // let uiniqueKey2 = [];
    Image2.prototype.list = function() {

            if (!uiniqueKey.includes(this.keyword)) {
                uiniqueKey.push(this.keyword)
                    // console.log(this);
                let $newOption = $('<option></option>');
                $('select').append($newOption);
                $($newOption).text(this.keyword);
                $($newOption).attr('value', this.keyword);
            }
        }
        // console.log(uiniqueKey);

    // $('main section').each(function() {
    //    
    //     if (selection === $(this).attr('class')) {
    //         $(this).show();
    //         console.log($(this));
    //     }


    // })

    // }

    const renderSelection = () =>
        $('select').change(function() {
            $('main section').each(function() {
                if ($(this).attr('class') === $('select').val()) {
                    $(this).show();
                }
                if ($(this).attr('class') !== $('select').val()) {
                    $(this).hide();
                }
            })
        })
    renderSelection();
    // $('select').on('click', function() {
    //     let selection = $(this).val();
    //     console.log(selection);
    //     if (selection === 'default') {
    //         $('main').show();
    //     } else {
    //         $('main').hide();
    //         // let valueOfOption = $(this).children("optiosn:selected").val();
    //         // console.log(valueOfOption);
    //         $('.' + selection).show();
    //     }
    // })

    const renderSelection2 = () =>
        $('select').change(function() {
            $('main section').each(function() {
                if ($(this).attr('class') === $('select').val()) {
                    $(this).show();
                }
                if ($(this).attr('class') !== $('select').val()) {
                    $(this).hide();
                }
            })
        })
    renderSelection2();

    function pageRender() {

        $('#button1').on('click', function() {

            // $('main section').hide();
            for (let i = 0; i < Image.all.length; i++) {
                // $('main section').html(Image.all[i].title);
                console.log(i);
            }
            console.log(Image.all);
        })

    }
    pageRender();

    // {

    //     $(this).show();
    //     console.log(this);
    // })
    // }
    // }
    // console.log(this);
    // console.log($(this));
    // $('main section').each(function() {
    //     let i1 = 0;
    //     if (i1 <= 20) {
    //         $(this).show();
    //         console.log($(this));
    //     }
    // })




})