// コーディング規約などによってdata属性が使えない場合があるため、セレクタは定数として保持しておく
const MODAL_SEL = "[data-modal]";
const OPEN_SEL = "[data-modal-open]";
const CONTAINER_SEL = "[data-modal-container]";
const CLOSE_SEL = "[data-modal-close]";
const PREV_SEL = "[data-modal-prev]";
const NEXT_SEL = "[data-modal-next]";

const OPEN_CLASS = "is-open";
const CLOSE_CLASS = "is-close";

const modals = document.querySelectorAll(`${MODAL_SEL}`);
const openTriggers = document.querySelectorAll(`${OPEN_SEL}`);
const closeTriggers = document.querySelectorAll(`${CLOSE_SEL}`);
const prevTriggers = document.querySelectorAll(`${PREV_SEL}`);
const nextTriggers = document.querySelectorAll(`${NEXT_SEL}`);

// 開くボタンをクリックしたとき
openTriggers.forEach((openTrigger) => {
	openTrigger.addEventListener("click", () => {
		const modalId = openTrigger.dataset.modalOpen;
		openModal(modalId);
	});
});

// 閉じるボタンをクリックしたとき
closeTriggers.forEach((closeTrigger) => {
	closeTrigger.addEventListener("click", () => {
		const modalId = closeTrigger.closest(MODAL_SEL).id;
		closeModal(modalId);
	});
});

// 閉じるボタン以外で閉じるとき
modals.forEach((modal) => {
	// 背景部分をクリック
	modal.addEventListener("click", (e) => {
		const modalId = modal.id;
		if (!e.target.closest(CONTAINER_SEL)) {
			closeModal(modalId);
		}
	});

	// ESCキーを押したとき
	modal.addEventListener("keydown", (e) => {
		const modalId = modal.id;
		if (e.key === "Escape") {
			// デフォルトでもモーダルが閉じるが、アニメーションさせるためにキャンセルする
			e.preventDefault();

			closeModal(modalId);
		}
	});
});

// 前のモーダルを表示
prevTriggers.forEach((prevTrigger) => {
	prevTrigger.addEventListener("click", () => {
		const modalId = prevTrigger.closest(MODAL_SEL).id;
		closeModal(modalId);

		const prevModalId = prevTrigger.dataset.modalPrev;
		openModal(prevModalId);
	});
});

// 次のモーダルを表示
nextTriggers.forEach((nextTrigger) => {
	nextTrigger.addEventListener("click", () => {
		const modalId = nextTrigger.closest(MODAL_SEL).id;
		closeModal(modalId);

		const nextModalId = nextTrigger.dataset.modalNext;
		openModal(nextModalId);
	});
});

// モーダルを開く関数
function openModal(modalId) {
	const modal = document.getElementById(modalId);

	// モーダル表示前にクラスをつける(開くときのアニメーション開始)
	modal.classList.add(OPEN_CLASS);

	// モーダルを開く
	modal.showModal();

	// モーダルを開いた後にクラスをはずす
	requestAnimationFrame(() => {
		modal.classList.remove(OPEN_CLASS);
	});
}

// モーダルを閉じる関数
function closeModal(modalId) {
	const modal = document.getElementById(modalId);

	// モーダルを閉じる前にクラスをつける(閉じるときのアニメーション開始)
	modal.classList.add(CLOSE_CLASS);

	// アニメーション終了後にクラスを外してモーダルを閉じる
	// アニメーションが"transition"ではなく"animation"の場合は"animationend"
	modal.addEventListener(
		"transitionend",
		() => {
			modal.classList.remove(CLOSE_CLASS);
			modal.close();
		},
		{ once: true }
	);
}
