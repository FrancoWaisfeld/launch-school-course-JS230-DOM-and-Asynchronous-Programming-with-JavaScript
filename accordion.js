$(() => {
  $('form').on('submit', (event) => {
    event.preventDefault();
    submittedKey = $("#key").val();
  
    $(document).off('keypress').on('keypress', (event) => {
      if (event.key !== submittedKey) {
        return;
      }
    
      $('a').trigger('click');
    });  
  });
  
  
  $('a').on('click', (event) => {
    event.preventDefault();
    $('#accordion').slideToggle();
  });
});