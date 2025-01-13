import { useEffect, useState } from 'react';
import { ColorPicker } from '../colorpicker/ColorPicker';

const defaultColor = { r: -1, g: -1, b: -1, a: 1 };

export default function ColorRules({ updateRule }) {
	const [fontColor, setFontColor] = useState(defaultColor);
	const [borderColor, setBorderColor] = useState(defaultColor);
	const [bgColor, setBgColor] = useState(defaultColor);
	const [hexColors, setHexColors] = useState({ font: '#ffffff', border: '#ffffff', background: '#ffffff' });

	function convertRgbaToFilterString(color) {
		const alpha = Math.round(color.a * 255);
		if (alpha < 255) {
			return [color.r, color.g, color.b, alpha].join(' ');
		}
		return [color.r, color.g, color.b].join(' ');
	}

	function RgbaToHex(color) {
		let r = (+color.r).toString(16),
			g = (+color.g).toString(16),
			b = (+color.b).toString(16),
			a = Math.round(+color.a * 255).toString(16);

		if (r.length == 1) r = '0' + r;
		if (g.length == 1) g = '0' + g;
		if (b.length == 1) b = '0' + b;
		if (a.length == 1) a = '0' + a;
		return '#' + r + g + b + a;
	}

	useEffect(() => {
		const font = fontColor.r >= 0 ? `SetTextColor ${convertRgbaToFilterString(fontColor)}` : '';
		const border = borderColor.r >= 0 ? `SetBorderColor ${convertRgbaToFilterString(borderColor)}` : '';
		const bg = bgColor.r >= 0 ? `SetBackgroundColor ${convertRgbaToFilterString(bgColor)}` : '';
		const ws1 = font ? `\n  ` : '';
		const ws2 = (font || border) && bg ? `\n  ` : '';
		updateRule(`${font}${ws1}${border}${ws2}${bg}`);
		setHexColors({
			font: fontColor.r >= 0 ? RgbaToHex(fontColor) : '#ffffff',
			border: borderColor.r >= 0 ? RgbaToHex(borderColor) : '#ffffff',
			bg: bgColor.r >= 0 ? RgbaToHex(bgColor) : '#ffffff',
		});
	}, [fontColor, borderColor, bgColor]);

	return (
		<div className="flex gap-5">
			<div className="flex items-center gap-1">
				<span className={fontColor.r === -1 ? 'opacity-40' : ''}>Font</span>
				<ColorPicker color={fontColor} onChange={setFontColor} resetColor={() => setFontColor(defaultColor)} />
			</div>
			<div className="flex items-center gap-1">
				<span className={borderColor.r === -1 ? 'opacity-40' : ''}>Border</span>
				<ColorPicker color={borderColor} onChange={setBorderColor} resetColor={() => setBorderColor(defaultColor)} />
			</div>
			<div className="flex items-center gap-1">
				<span className={bgColor.r === -1 ? 'opacity-40' : ''}>Background</span>
				<ColorPicker color={bgColor} onChange={setBgColor} resetColor={() => setBgColor(defaultColor)} />
			</div>

			<div
				className={`p-[5px] border ml-8 poe-font hover:brightness-125 cursor-default`}
				style={{
					color: hexColors.font,
					borderColor: hexColors.border,
					backgroundColor: hexColors.bg,
				}}
			>
				Exalted Orb
			</div>
		</div>
	);
}
