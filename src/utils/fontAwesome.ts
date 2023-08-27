import { library } from "@fortawesome/fontawesome-svg-core";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
	fas,
	faCircleXmark,
	faBars,
	faEllipsisVertical,
	faPenToSquare,
	faX,
	faAngleLeft,
	faAnglesLeft,
	faAngleRight,
	faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

export default function loadFontAwesome() {
	library.add(
		fas,
		faDiscord,
		faCircleXmark,
		faBars,
		faEllipsisVertical,
		faPenToSquare,
		faX
	);

	library.add(faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight);
}
