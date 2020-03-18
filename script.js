const container = document.getElementById('container');
const loading = document.querySelector('.loading');

getPost();
getPost();
getPost();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 1) {
    loading.classList.add('active');

    setTimeout(getPost, 800);
  }
});

async function getPost() {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${getRand()}`
  );
  const postData = await postResponse.json();

  const data = { post: postData };

  addDataToDOM(data);
}

function getRand() {
  return Math.floor(Math.random() * 100) + 1;
}

function addDataToDOM(data) {
  const postElement = document.createElement('div');
  postElement.classList.add('blog-post');
  postElement.innerHTML = `
		<h2 class="title">${data.post.title}</h2>
		<p class="text">${data.post.body}</p>
		<div class="user-info">
			<img src="https://randomuser.me/api/portraits/men/50.jpg" alt="photo" />
			<span>Mike Walsh</span>
		</div>
	`;
  container.appendChild(postElement);

  loading.classList.remove('active');
}
