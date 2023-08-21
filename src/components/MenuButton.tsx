import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuButton() {
  return (
    <a href="/" className="flex flex-row align-middle">
      <FontAwesomeIcon icon={faHouse} />
    </a>
  );
}
