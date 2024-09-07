let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
};

post.body = '<p>' + post.body + '</p>';
post.tags = ['Food', 'Cooking', 'Vegetables'];

let post2 = {
  title: 'yes',
  published: 'date',
  body: 'body.',
}

let posts = [post, post2];

document.addEventListener('DOMContentLoaded', () => {
  let postsTemplate = Handlebars.compile(document.getElementById('posts').innerHTML);
  Handlebars.registerPartial('tag', $('#tag').html());

  $('body').append(postsTemplate({ posts: posts }));
});