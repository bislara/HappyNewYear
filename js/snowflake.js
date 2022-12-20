let html = document.getElementsByTagName("body");

const createSnowFlake = () => {
	const snowflake = document.createElement("span");
	snowflake.classList.add("material-symbols-outlined");
	snowflake.textContent = "❄";
	snowflake.classList.add(`snowflake`);

	document.body.appendChild(snowflake);

	const winWidth = window.innerWidth;

	let randomLeft = getRandomNumber(0, winWidth);
	let randomOpacity = getRandomNumber(0, 1);
	let randomSize = getRandomNumber(2, 3.5);

	snowflake.style.left = randomLeft + "px";
	snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
	snowflake.style.opacity = randomOpacity;
	snowflake.style.fontSize = randomSize + "rem";

	setTimeout(() => {
		// remove snowflake after 5s
		snowflake.remove();
	}, 5000);
};

const getRandomNumber = (min, max) => {
	return Math.random() * (max - min) + min;
};

setInterval(createSnowFlake, 40); // Create snowflake every 50ms (lower interval more snowflakes)
