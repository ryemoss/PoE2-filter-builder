import { useState, useRef, useEffect, useCallback } from 'react';

export default function DropdownMenu({ options, className, itemSelected }) {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
	const dropdownRef = useRef(null);
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const calculateDropdownPosition = useCallback(() => {
		if (dropdownRef.current) {
			const rect = dropdownRef.current.getBoundingClientRect();

			setDropdownPosition({
				left: 100,
				top: rect.bottom + 8,
			});
		}
	}, []);

	function selectDropdownValue(value) {
		setIsOpen(false);
		setSelectedOption(value);
		if (itemSelected) itemSelected(value);
	}

	const DropdownMenuContent = ({ children }) => {
		return (
			<div className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-25 z-10">
				<div className="p-1 whitespace-nowrap">{children}</div>
			</div>
		);
	};

	const DropdownMenuOption = ({ value, color, children }) => {
		return (
			<div
				className={`text-left p-2 text-sm hover:bg-zinc-300 cursor-pointer ${color} ${
					selectedOption === children && 'bg-zinc-200'
				}`}
				onClick={() => selectDropdownValue(children)}
				key={value}
			>
				{children}
			</div>
		);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('resize', calculateDropdownPosition);
		calculateDropdownPosition();

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('resize', calculateDropdownPosition);
		};
	}, [calculateDropdownPosition]);

	return (
		<div className={`relative inline-block text-left`} ref={dropdownRef}>
			<button onClick={() => setIsOpen(!isOpen)} className={`secondary px-2 py-1 font-medium shadow ${className}`}>
				{selectedOption || options[0]}
			</button>
			{isOpen && (
				<DropdownMenuContent style={{ left: `${dropdownPosition.left}px`, top: `${dropdownPosition.top}px` }}>
					{options.map((option, idx) => {
						return (
							<DropdownMenuOption value={idx} color="text-zinc-900" key={option}>
								{option}
							</DropdownMenuOption>
						);
					})}
				</DropdownMenuContent>
			)}
		</div>
	);
}
