import type { StaticImageData } from "next/image";

type ImageSizeProps =
	| {
			width: number;
	  }
	| {
			height: number;
	  };
export function getImageSize(image: StaticImageData, options: ImageSizeProps) {
	if ("width" in options) {
		return (options.width * image.height) / image.width;
	} else {
		return (options.height * image.width) / image.height;
	}
}
