import { useState } from 'react';
import { useStore } from '../store/store';

const FILTER_HEADER = `#-------------------------
# FILTER BUILDER
#-------------------------

`;

const FILTER_FOOTER = `
#-------------------------`;

export function useFilePrepare() {
	const store = useStore();
	const [filePreview, setFilePreview] = useState('');

	function transformRuleGroupToString(group) {
		let rulesString = '';
		rulesString += `${group.isHideType ? 'Hide' : 'Show'}\n`;
		const rules = store.getRules();
		group.ruleIds.forEach((id) => {
			const rule = rules.find((rule) => rule.id == id);
			rulesString += transformRuleToString(rule);
		});
		return rulesString;
	}

	function transformRuleToString(rule) {
		if (!rule.content) return '';
		let ruleString = `  `;
		if (rule.name) ruleString += `${rule.name} `;
		const ruleVals = rule.content;
		if (ruleVals) {
			ruleString += ruleVals;
			ruleString += '\n';
		}
		return ruleString;
	}

	function transformToFilterText() {
		let finalText = '';
		finalText += FILTER_HEADER;

		store.getGroups().forEach((group) => {
			finalText += transformRuleGroupToString(group);
		});

		finalText += FILTER_FOOTER;
		setFilePreview(finalText);
	}

	return { filePreview, transformToFilterText };
}

export default function FileExport() {
	const { filePreview, transformToFilterText } = useFilePrepare();

	function prepareAndDownload() {
		transformToFilterText();
		downloadFile(filePreview);
	}

	function downloadFile(text) {
		const fileBlob = new Blob([text], { type: 'text/plain' });
		const fileUrl = URL.createObjectURL(fileBlob);

		const a = document.createElement('a');
		a.href = fileUrl;
		a.download = 'myfilter.filter';
		a.click();

		URL.revokeObjectURL(fileUrl);
	}

	return (
		<button className="justify-self-end w-[50%]" onClick={prepareAndDownload}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1}
				stroke="currentColor"
				className="size-5 mr-2 inline-block"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
				/>
			</svg>
			<span>Download .filter file</span>
		</button>
	);
}
