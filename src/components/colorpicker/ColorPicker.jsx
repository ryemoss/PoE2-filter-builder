import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import './styles.css';

import useClickOutside from '../../utils/useClickOutside';

export const ColorPicker = ({ color, onChange, resetColor }) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);
	const [cssColor, setCssColor] = useState('rgba(0,0,0,1)');

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);

	useEffect(() => {
		setCssColor(`rgba(${color.r},${color.g},${color.b},${color.a})`);
	}, [color]);

	function handleReset() {
		toggle(false);
		resetColor();
	}

	return (
		<div className="picker">
			<div
				className="swatch flex items-center justify-center text-zinc-500"
				style={{ backgroundColor: color.r >= 0 ? cssColor : '' }}
				onClick={() => toggle(true)}
			>
				{color.r === -1 && '🞩'}
			</div>

			{isOpen && (
				<div className="popover z-20" ref={popover}>
					<RgbaColorPicker color={color} onChange={onChange} />
					<div className="w-full p-1 text-center">
						{color.r >= 0 ? (
							<>
								{color.r} {color.g} {color.b} {Math.round(color.a * 255)}
							</>
						) : (
							'0 0 0 255'
						)}
					</div>
					<button className="w-full" onClick={handleReset}>
						Reset to default
					</button>
				</div>
			)}
		</div>
	);
};
