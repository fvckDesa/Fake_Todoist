import Illustrations from "../assets/illustrations";
import { emptyProjectIllustration } from "./elements";

export function setRandomIllustration() {
  const IllustrationsArray = Object.values(Illustrations);
  const randomIllustration = IllustrationsArray[Math.floor(Math.random() * IllustrationsArray.length)];
  emptyProjectIllustration.src = randomIllustration;
}