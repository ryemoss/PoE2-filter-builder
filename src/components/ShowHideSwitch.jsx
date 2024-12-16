import { useEffect, useState } from 'react';

export default function ShowHideSwitch({ onMouseOver, onMouseExit, toggleVal }) {
	const [isHide, setIsHide] = useState(false);

	function handleToggle() {
		setIsHide((prev) => !prev);
	}

	useEffect(() => {
		toggleVal(isHide);
	}, [isHide]);

	return (
		<div
			className="border-2 border-zinc-600 self-start selection:transparent shadow rounded-xl mb-1"
			onClick={handleToggle}
			onMouseEnter={onMouseOver}
			onMouseLeave={onMouseExit}
		>
			<div
				className={`${
					!isHide ? 'bg-zinc-600 text-white' : 'opacity-20'
				} py-1 px-2 cursor-pointer inline-block text-xs rounded-l-lg`}
			>
				Show
			</div>
			<div
				className={`${
					isHide ? 'bg-zinc-600 text-white' : 'opacity-20'
				} py-1 px-2 cursor-pointer inline-block text-xs rounded-r-lg`}
			>
				Hide
			</div>
		</div>
	);
}
