import { useEffect, useState } from 'react';
import data from '../../assets/data-010d.json';
import DropdownMenu from '../DropdownMenu';

const dropdownOptions = 'OtherItems';

export default function ItemRules({ updateRule }) {
	const [selectedPills, setSelectedPills] = useState([]);

	useEffect(() => {
		const pillString = selectedPills.map((pill) => `"${pill}"`).join(' ');
		updateRule(`Class ${pillString}`);
	}, [selectedPills]);

	function selectPill(item) {
		if (!selectedPills.includes(item)) {
			setSelectedPills([...selectedPills, item]);
		} else {
			setSelectedPills((prev) => prev.filter((x) => x != item));
		}
	}

	const PillsContainer = () => {
		return (
			<div className="flex flex-wrap gap-1 pt-1 pr-2">
				{data[dropdownOptions].map((item) => {
					return (
						<div
							className={`item-pill ${selectedPills?.includes(item) ? '' : 'opacity-30'}`}
							onClick={() => selectPill(item)}
							key={item}
						>
							<span>{item}</span>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="flex gap-4">
			<span className="w-[60px]">Items</span>
			<hr className="vertical" />
			<PillsContainer />
		</div>
	);
}
