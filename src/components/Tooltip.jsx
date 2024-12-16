import { useEffect, useState, useRef } from 'react';

export const useTooltip = () => {
	const [tooltipData, setTooltipData] = useState(null);
	const timer = useRef(null);

	const showTooltip = (clientX, clientY, text) => {
		clearTimeout(timer.current);

		timer.current = setTimeout(() => {
			setTooltipData({ clientX, clientY, isVisible: true, text });
		}, 500);
	};

	const hideTooltip = () => {
		clearTimeout(timer.current);
		setTooltipData(null);
	};

	return { tooltipData, showTooltip, hideTooltip };
};

export const Tooltip = ({ clientX, clientY, isVisible, text }) => {
	return (
		<>
			{isVisible && (
				<div
					className={`absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-25 z-10 transition-opacity duration-300 ${
						isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
					}`}
					style={{
						left: `${clientX}px`,
						top: `${clientY - 36}px `,
					}}
				>
					<div className="p-1 whitespace-nowrap text-xs text-gray-700 pointer-events-none">{text}</div>
				</div>
			)}
		</>
	);
};
