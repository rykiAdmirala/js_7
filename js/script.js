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

  // Retrieving
  var test = JSON.parse(localStorage.getItem('testContent'));

  // Initialising templating
  var tmplModel = $('#tmpl').html();
  var testPage = tmpl(tmplModel, {
    data : test
  });

  // Displaying rendered page
  $('.wrapper').prepend(testPage);



  /*
  ** Checking form for correct answers
  */
  var
    numOfQuestions = testContent.length,
    countCorrectAnswers = 0;

  $('.submit-btn').on('click', checkForm);  

  function checkForm(e) {
    e.preventDefault();

    for (var i = 0; i < numOfQuestions; i++) {
      var chckbx = $('.test-form input[name="Question '+i+'"]:checked');
        console.log('loop start');

      if (testContent[i].correctAnswersIndex.indexOf(chckbx.val()) != -1) {
        countCorrectAnswers++;
        console.log('if');
      } else if (countCorrectAnswers == numOfQuestions) {
        console.log('else if');
        return showModal();
      } else {
        console.log('else');
        return showModal('fail');
      }
    }

  }

  function showModal(type) {
    var modalMessage;

    if (type == 'fail') {

      modalMessage =
        '<p class="modal-heading">Вы провалили тест!<p>\
        Вы ответили правильно на' +countCorrectAnswers + 'из ' + (numOfQuestions+1) + 'вопросов.';

    } else {
      modalMessage = '<p class="modal-heading">Congratz!</p>Вы успешно прошли тест, ура!';
    }

    var modalWindow = $('<div class="modal-wrap">' + modalMessage + '</div>');
    var overlay = $('<div class="modal-overlay"></div>');

    modalWindow.add(overlay).append('body').fadeIn();


  }



});