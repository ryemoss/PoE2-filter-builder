import './FilterGroup.scss';
import ShowHideSwitch from './ShowHideSwitch';
import RarityRule from './rules/RarityRule';
import EquipmentRules from './rules/EquipmentRules';
import ItemsRules from './rules/ItemsRules';
import RuleMenu from './RuleMenu';
import ItemStat from './rules/ItemStat';
import CurrencyRules from './rules/CurrencyRules';
import ColorRules from './rules/ColorRules';
import MinimapIconRules from './rules/MinimapIconRules';
import { uuid } from '../utils/uidGenerator';
import { memo, useCallback, useEffect, useState } from 'react';
import { useStore } from '../store/store.js';
import { useTooltip, Tooltip } from './Tooltip';

const ruleOptions = ['Rarity', 'Currency', 'Equipment Type', 'Items', 'Stats', 'Colors', 'Minimap Icon'];

const RuleWrapper = memo(({ id, children, removeRule }) => (
	<div className="flex justify-between rule p-1 border border-transparent">
		{children}
		<button className="close text-xs px-2 py-1" onClick={() => removeRule(id)}>
			🞩
		</button>
	</div>
));

const RuleGroups = memo(({ rules, removeRule }) => {
	const store = useStore();

	const updateRule = useCallback((id, val) => {
		store.updateRule(id, val);
	});

	return rules.map(({ id, component: RuleComponent }) => {
		if (!id) return;
		return (
			<RuleWrapper key={id} id={id} removeRule={removeRule}>
				<RuleComponent updateRule={(val) => updateRule(id, val)} />
			</RuleWrapper>
		);
	});
});

export default function FilterGroup({ id, removeGroup }) {
	const [rules, setRules] = useState([]);
	const { tooltipData, showTooltip, hideTooltip } = useTooltip();
	const [blacklistedRules, setBlacklistedRules] = useState([]);

	const store = useStore();

	useEffect(() => {
		store.updateGroup(
			id,
			rules.map((rule) => rule.id)
		);
	}, [rules]);

	function addNewRule(rule) {
		const newRule = () => {
			switch (rule) {
				case 'Rarity':
					return { id: uuid(), pos: 1, name: 'Rarity', component: RarityRule };
				case 'Equipment Type':
					return { id: uuid(), pos: 2, name: 'Equipment Type', component: EquipmentRules };
				case 'Items':
					return { id: uuid(), pos: 2, name: 'Items', component: ItemsRules };
				case 'Currency':
					return { id: uuid(), pos: 2, name: 'Currency', component: CurrencyRules };
				case 'Stats':
					return { id: uuid(), pos: 3, name: 'Stats', component: ItemStat };
				case 'Colors':
					return { id: uuid(), pos: 9, name: 'Colors', component: ColorRules };
				case 'Minimap Icon':
					return { id: uuid(), pos: 10, name: 'Minimap Icon', component: MinimapIconRules };
				default:
					return null;
			}
		};
		const ruleToAdd = newRule();

		if (ruleToAdd) {
			setRules((prevRules) => {
				const updatedRules = [...prevRules, ruleToAdd];
				return updatedRules.sort((a, b) => a.pos - b.pos);
			});
		}
		updateBlacklistedRules(rule);
	}

	function removeRule(id) {
		updateBlacklistedRules(rules.find((rule) => rule.id == id).name);
		setRules((prev) => prev.filter((rule) => id !== rule.id));
	}

	function updateBlacklistedRules(rule) {
		if (rule !== 'Stats') {
			if (blacklistedRules.includes(rule)) {
				setBlacklistedRules((list) => list.filter((r) => r != rule));
			} else {
				setBlacklistedRules([...blacklistedRules, rule]);
			}
		}
	}

	function toggleShowHide(val) {
		store.updateGroupType(id, val);
	}

	function handleMouseOver(el) {
		const rect = el.target.getBoundingClientRect();
		showTooltip(rect.left + window.scrollX, rect.top + window.scrollY, 'Should this filter Show or Hide these items?');
	}

	function handleMouseExit(el) {
		hideTooltip();
	}

	const RemoveGroupButton = () => (
		<button className="close group absolute p-1 opacity-50 top-1 right-[-36px]" onClick={removeGroup}>
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 32 32">
				<path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
			</svg>
		</button>
	);

	return (
		<>
			<div className="border border-slate-300 p-3 bg-white relative rule-group">
				<div className="flex flex-col gap-1">
					<ShowHideSwitch toggleVal={toggleShowHide} onMouseOver={handleMouseOver} onMouseExit={handleMouseExit} />
					<RuleGroups rules={rules} removeRule={removeRule} />
					<RuleMenu options={ruleOptions} blacklisted={blacklistedRules} itemSelected={addNewRule} />
				</div>
				<RemoveGroupButton />
			</div>
			<Tooltip {...tooltipData} />
		</>
	);
}
