/* ----------------------------------------------------------------------------
creates a responsive <img>
---------------------------------------------------------------------------- */
import eleventyImage, { eleventyImagePlugin } from '@11ty/eleventy-img';

export default async function image(
	src,
	alt,
	cssClass = null,
	sizes = '90vw',
	loadingAttr = 'lazy',
) {
	const filePath = `_source/assets/images/${src}`;
	const metadata = await eleventyImage(filePath, {
		widths: [250, 500, 1000, 1500, 2000, 2500, 3000],
		formats: ['jxl', 'avif', 'jpeg'],
		urlPath: '/assets/images/',
		outputDir: './_public/assets/images/',
		sharpWebpOptions: { quality: 75 },
	});
	const format = metadata[Object.keys(metadata)[0]];
	const data = format[format.length - 1];

	return `<img
    ${cssClass != null ? `class="${cssClass}"` : ''}
    src="${data.url}"
    width="${data.width}"
    height="${data.height}"
    alt="${alt}"
    loading="${loadingAttr}"
    decoding="async"
    sizes="(max-width: 44.9em) ${sizes}"
    srcset="${Object.values(metadata).map((imageFormat) => imageFormat.map((entry) => entry.srcset).join(', '))}">`;
}
