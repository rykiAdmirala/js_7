'use strict';

$(function() {

    var testContent = [
        {
            title: 'По чём в Одессе рубероид?',
            answers: ['40 рублив','20 грывень','Неизмеримо','Большие, но по 5'],
            correctAnswersIndex: [1]
        },
        {
            title: 'Где живёт фазан?',
            answers: ['У охотника дома','В замке','Маленькие, но по 3','Там, где больше платят'],
            correctAnswersIndex: [0,3]
        },
        {
            title: 'Какой ответ на главный вопрос Жизни, Вселенной и Всего Остального?',
            answers: ['Мама мыла раму','Два с половиной человека','42','1,5 землекопа'],
            correctAnswersIndex: [2]
        }
    ];

    // Saving to storage
    localStorage.setItem('testContent', JSON.stringify(testContent));

    // Retrieving from storage
    var test = JSON.parse(localStorage.getItem('testContent'));

    // Initialising templating
    var tmplModel = $('#tmpl').html();
    var testPage = tmpl(tmplModel, {
        data : test
    });

    // Displaying rendered page
    $('.wrapper').prepend(testPage);



    /**
     * Checking form for correct answers
    **/
    var
      numOfQuestions = testContent.length,
      countCorrectAnswers = 0;

    $('.submit-btn').on('click', checkForm);

    function checkForm(e) {
        // Preventing submit button from sending info to server
        e.preventDefault();

        // Comparing results for each question
        for (var i = 0; i < numOfQuestions; i++) {

            var checkbox = $('.test-form input[name="Question '+i+'"]:checked');
            var checkboxVal = parseInt(checkbox.val());

            if (testContent[i].correctAnswersIndex.indexOf(checkboxVal) > -1) {
                // Checking if value of given answer exists in array of correct answers
                countCorrectAnswers++;
            }
        }

        if (countCorrectAnswers == numOfQuestions) {
            return showModal();
        } else {
            return showModal('fail');
        }

    }

    function showModal(type) {
        var modalMessage;
        var btnText;

        if (type == 'fail') {
            modalMessage =
                '<p class="modal-heading">Вы провалили тест!<p>\
                Вы ответили правильно на <b>' +countCorrectAnswers + '</b> из <b>' + (numOfQuestions) + '</b> вопросов';
            btnText = 'Okay(';
        } else {
            modalMessage = '<p class="modal-heading">Congratz!</p>Вы успешно прошли тест, ура!';
            btnText = 'Ехууу!'
        }

        // Creating modal elements
        var modalWindow =
                      $('<div class="modal-wrap">' + modalMessage +
                      '<button type="button" class="modal-close">' + btnText + '</button>' +
                      '</div>');
        var overlay = $('<div class="modal-overlay"></div>');

        // Appending, positioning and displaying elements
        modalWindow.add(overlay).appendTo('body');
        modalWindow.css({
                    'margin-top': -modalWindow.outerHeight() / 2,
                    'margin-left': -modalWindow.outerWidth() / 2
                  })
                  .add(overlay).fadeIn(300);

        // Handling closing of modal window
        $('.modal-close, .modal-overlay').one('click', function () {
            modalWindow.add(overlay).fadeOut(400, function() {
                modalWindow.add(overlay).remove();
            })
        });

        // Clearing results
        countCorrectAnswers = 0;
        $('input:checkbox').attr('checked', false);
    }

});