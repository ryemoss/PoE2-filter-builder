import { useEffect, useState } from 'react';

export const useTooltip = () => {
	const [tooltipData, setTooltipData] = useState(null);

	const showTooltip = (clientX, clientY, text) => {
		setTooltipData({ clientX, clientY, isVisible: true, text });
	};

	const hideTooltip = () => {
		setTooltipData(null);
	};

	return { tooltipData, showTooltip, hideTooltip };
};

export const Tooltip = ({ clientX, clientY, isVisible, text }) => {
	return (
		<>
			{isVisible && (
				<div
					className="absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-25 z-10"
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
