import { memo, useEffect, useState } from 'react';
import data from '../../assets/data-010d.json';
import DropdownMenu from '../DropdownMenu';
import InputBox from '../InputBox';

const dropdownOptions = ['Gold', 'Orbs', 'Shards'];
const comparisons = ['<', '>', '<=', '>=', '='];

export default function CurrencyRules({ updateRule }) {
	const [currencyType, setCurrencyType] = useState(dropdownOptions[0]);
	const [selectedPills, setSelectedPills] = useState([]);
	const [comparison, setComparison] = useState(comparisons[0]);
	const [stacksize, setStacksize] = useState(0);

	useEffect(() => {
		if (currencyType === 'Gold') {
			updateRule(`Class Currency\n  BaseType == "Gold"\n  StackSize ${comparison} ${stacksize}`);
		} else if (currencyType === 'Orbs') {
			const pillString = selectedPills.join(' ');
			updateRule(`Class Currency\n  BaseType ${pillString}`);
		} else if (currencyType === 'Shards') {
			const pillString = selectedPills.join(' ');
			updateRule(`Class Currency\n  BaseType ${pillString}`);
		}
	}, [currencyType, selectedPills, comparison, stacksize]);

	function selectPill(item) {
		if (!selectedPills.includes(item)) {
			setSelectedPills([...selectedPills, item]);
		} else {
			setSelectedPills((prev) => prev.filter((x) => x != item));
		}
	}

	function dropdownOptionSelected(val) {
		setCurrencyType(val);
		setSelectedPills([]);
	}

	const PillsContainer = () => {
		return (
			<div className="flex flex-wrap gap-1 pt-1 pr-2">
				{data[currencyType].map((item) => {
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
			{(currencyType === 'Orbs' || currencyType === 'Shards') && <PillsContainer />}
			{currencyType === 'Gold' && (
				<div className="flex gap-3 items-center">
					<span>Stack size</span>
					<DropdownMenu options={comparisons} itemSelected={(v) => setComparison(v)} className={'w-[40px]'} />
					<InputBox onChange={(e) => setStacksize(e.target.value)} />
				</div>
			)}
		</div>
	);
}
