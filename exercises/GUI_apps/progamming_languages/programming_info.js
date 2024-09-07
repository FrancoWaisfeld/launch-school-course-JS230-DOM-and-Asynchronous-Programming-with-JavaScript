const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  let languagesHTML = document.querySelector('#languages').innerHTML;
  let languagesTemplate = Handlebars.compile(languagesHTML);

  function shortenTextTo120Chars(text, ending) {
    return text.slice(0, 120) + ending;
  }

  let shortenedLanguages = [];
  for (let index in languages) {
    let language = {};
    language.name = languages[index].name
    language.description = shortenTextTo120Chars(languages[index].description, '...');
    shortenedLanguages.push(language);
  }

  document.querySelector('.programming_languages').innerHTML = languagesTemplate({languages: shortenedLanguages});

  let showMoreButtons = document.querySelectorAll('a');
  showMoreButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      let paragraph = button.previousElementSibling;
      let currentButtonText = button.textContent;
      let currentParagraphText = paragraph.textContent;
      let languageName = button.parentElement.getAttribute('data-language');

      if (currentButtonText === "Show More") {
        button.textContent = "Show Less";
        paragraph.textContent = languages.filter(language => language.name === languageName)[0].description;
      } else if (currentButtonText === "Show Less") {
        button.textContent = "Show More";
        paragraph.textContent = shortenTextTo120Chars(currentParagraphText, "...")
      }
    });
  });
});