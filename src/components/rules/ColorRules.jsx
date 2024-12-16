import { useEffect, useState } from 'react';
import { ColorPicker } from '../colorpicker/ColorPicker';

const defaultColor = { r: -1, g: -1, b: -1, a: 1 };

export default function ColorRules({ updateRule }) {
	const [fontColor, setFontColor] = useState(defaultColor);
	const [borderColor, setBorderColor] = useState(defaultColor);
	const [bgColor, setBgColor] = useState(defaultColor);

	function convertRgbaToFilterString(color) {
		return `${color.r} ${color.g} ${color.b} ${Math.round(color.a * 255)}`;
	}

	useEffect(() => {
		const font = fontColor.r >= 0 ? `SetTextColor ${convertRgbaToFilterString(fontColor)}\n  ` : '';
		const border = borderColor.r >= 0 ? `SetBorderColor ${convertRgbaToFilterString(borderColor)}\n  ` : '';
		const bg = bgColor.r >= 0 ? `SetBackgroundColor ${convertRgbaToFilterString(bgColor)}` : '';
		updateRule(`${font}${border}${bg}`);
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
		</div>
	);
}
