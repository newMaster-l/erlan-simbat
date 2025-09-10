// =======================
// Overlay + Background Audio
// =======================
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('open-btn');
const audio = document.getElementById('bg-audio');
const volumeBtn = document.querySelector('.volume');

if (overlay && openBtn && audio && volumeBtn) {
	document.body.classList.add('locked');

	openBtn.addEventListener('click', () => {
		overlay.style.display = 'none';
		audio.muted = false;
		audio.play().catch(() => {
			console.log('Автовоспроизведение заблокировано, ждём клика.');
		});
		volumeBtn.classList.remove('muted');
		document.body.classList.remove('locked');
		document.body.classList.add('unlocked');
	});

	volumeBtn.addEventListener('click', () => {
		if (audio.paused) {
			audio.play().then(() => {
				volumeBtn.classList.remove('muted');
			});
		} else {
			audio.pause();
			volumeBtn.classList.add('muted');
		}
	});
}

// =======================
// Scroll Animations
// =======================
const animatedSections = document.querySelectorAll('.scroll-animate');
if (animatedSections.length > 0) {
	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const animation = entry.target.dataset.animate;
					if (animation) {
						entry.target.classList.add(...animation.split(' '));
					}
					entry.target.classList.add('start');
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.2 }
	);

	animatedSections.forEach((el) => observer.observe(el));
}

// =======================
// Slider
// =======================
document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('.splide')) {
		const splide = new Splide('.splide', {
			type: 'loop',
			autoplay: true,
			interval: 15000,
		});
		splide.mount();
	}
});

// =======================
// Modal (Wishes)
// =======================
const modal = document.getElementById('wishModal');
const openBtnModal = document.querySelector('.wish-open');
const closeBtnModal = document.getElementById('wishClose');

if (modal && openBtnModal && closeBtnModal) {
	openBtnModal.addEventListener('click', () => {
		modal.style.display = 'flex';
	});

	closeBtnModal.addEventListener('click', () => {
		modal.style.display = 'none';
	});

	window.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.style.display = 'none';
		}
	});

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			modal.style.display = 'none';
		}
	});
}

// =======================
// Countdown Timer
// =======================
function startCountdown() {
	const targetDate = new Date('2025-10-18T19:00:00').getTime();
	const container = document.querySelector('.countdown-container');
	if (!container) return;

	function updateCountdown() {
		const now = Date.now();
		const distance = targetDate - now;

		if (distance <= 0) {
			container.innerHTML = '<h2>Той басталды! 🎉</h2>';
			clearInterval(interval);
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById('days').textContent = days;
		document.getElementById('hours').textContent = hours;
		document.getElementById('minutes').textContent = minutes;
		document.getElementById('seconds').textContent = seconds;
	}

	updateCountdown();
	const interval = setInterval(updateCountdown, 1000);
}
startCountdown();

// =======================
// RSVP Form → Google Forms
// =======================
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
	rsvpForm.addEventListener('submit', async function (e) {
		e.preventDefault();

		const name = rsvpForm.querySelector("input[name='guestName']").value;
		const answer = rsvpForm.querySelector("input[name='answer']:checked").value;

		const googleFormURL =
			'https://docs.google.com/forms/d/e/1FAIpQLSe3tv_YN5-BwTTSAUDrSRCpXZ-ikUAAE5DwVG7T4RqsRDjGjA/formResponse';

		const formData = new FormData();
		formData.append('entry.298947705', name); // Имя
		formData.append('entry.1664401385', answer); // Ответ

		try {
			await fetch(googleFormURL, {
				method: 'POST',
				mode: 'no-cors',
				body: formData,
			});

			alert('✅ Жауабыңыз сақталды! Рахмет!');
			rsvpForm.reset();
		} catch (err) {
			alert('❌ Қате шықты, қайта көріңіз.');
		}
	});
}

// =======================
// Wish Form → Google Forms
// =======================
const wishForm = document.querySelector('.wish-form');
if (wishForm) {
	wishForm.addEventListener('submit', async function (e) {
		e.preventDefault();

		const name = wishForm.querySelector("input[name='name']").value;
		const message = wishForm.querySelector("textarea[name='message']").value;

		const googleFormURL =
			'https://docs.google.com/forms/d/e/1FAIpQLSdEFwF-pxuVztOqFP6TQb7XK0jk6YoNuE-g4TvesDS9gjDGWQ/formResponse';

		const formData = new FormData();
		formData.append('entry.72125919', name);
		formData.append('entry.1482242670', message);

		try {
			await fetch(googleFormURL, {
				method: 'POST',
				mode: 'no-cors',
				body: formData,
			});

			alert('✅ Тілегіңіз сақталды! Рахмет!');
			wishForm.reset();
			modal.style.display = 'none';
		} catch (err) {
			alert('❌ Қате шықты, қайта көріңіз.');
		}
	});
}
