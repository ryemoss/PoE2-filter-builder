import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function RuleMenu({ options, blacklisted, itemSelected, className }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
	const dropdownRef = useRef(null);

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
		setSelectedValue(value);
		setIsOpen(false);
		if (itemSelected) itemSelected(value);
	}

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

	const RuleMenuContent = ({ children }) => {
		return (
			<div className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-25 z-10 whitespace-nowrap">
				<div className="p-1">{children}</div>
			</div>
		);
	};

	const RuleMenuOption = ({ value, color, children }) => {
		return (
			<div
				className={`text-left p-2 text-sm hover:bg-zinc-100 cursor-pointer ${color} 
					${selectedValue === children && 'bg-zinc-200'} 
					${blacklisted?.includes(children) && 'line-through disabled pointer-events-none opacity-50 bg-none'}`}
				onClick={() => selectDropdownValue(children)}
				key={value}
			>
				{children}
			</div>
		);
	};

	return (
		<div className="relative self-start text-left mt-4" ref={dropdownRef}>
			<button className="small flex align-center gap-1" onClick={() => setIsOpen(!isOpen)}>
				<span>Add Rule</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
					<path
						fillRule="evenodd"
						d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>

			{isOpen && (
				<RuleMenuContent style={{ left: `${dropdownPosition.left}px`, top: `${dropdownPosition.top}px` }}>
					<div className="px-4 py-2 text-sm font-bold text-gray-700">Rule type</div>
					<hr />
					{options.map((option, idx) => {
						return (
							<RuleMenuOption value={idx} color="text-zinc-900" key={option}>
								{option}
							</RuleMenuOption>
						);
					})}
				</RuleMenuContent>
			)}
		</div>
	);
}
