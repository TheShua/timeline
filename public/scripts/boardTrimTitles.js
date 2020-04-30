const titles = document.querySelectorAll('article h3');

titles.forEach((title) => {
	if (title.textContent.length > 24) {
		title.textContent = title.textContent.substr(0, 20) + '...';
	}
});
