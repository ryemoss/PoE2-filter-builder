import { useEffect, useState } from 'react';
import data from '../../assets/data-010d.json';
import DropdownMenu from '../DropdownMenu';

const dropdownOptions = ['Weapons', 'Armor'];

export default function WeaponPills({ updateRule }) {
	const [pillSource, setPillSource] = useState(dropdownOptions[0]);
	const [selectedPills, setSelectedPills] = useState([]);

	useEffect(() => {
		const pillString = selectedPills.join(' ');
		updateRule(`Class ${pillString}`);
	}, [pillSource, selectedPills]);

	function selectPill(item) {
		if (!selectedPills.includes(item)) {
			setSelectedPills([...selectedPills, item]);
		} else {
			setSelectedPills((prev) => prev.filter((x) => x != item));
		}
	}

	function dropdownOptionSelected(val) {
		setPillSource(val);
		setSelectedPills([]);
	}

	const translateSource = (rawSrc) => {
		if (rawSrc == 'Weapons') {
			return 'WeaponClasses';
		} else {
			return 'ArmorClasses';
		}
	};

	const PillsContainer = () => {
		return (
			<div className="flex flex-wrap gap-1 pt-1 pr-2">
				{data[translateSource(pillSource || dropdownOptions[0])].map((item) => {
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
			<DropdownMenu options={dropdownOptions} className={'min-w-[100px]'} itemSelected={dropdownOptionSelected} />
			<hr className="vertical" />
			<PillsContainer />
		</div>
	);
}
