let groups = [];
let rules = [];

export const useStore = () => ({
	getGroups: function () {
		return groups;
	},
	getRules: function () {
		return rules;
	},
	updateGroupType: function (id, val) {
		const group = groups.find((x) => x.id == id);
		if (group) {
			group.isHideType = val;
		} else {
			groups.push({ id, isHideType: val });
		}
	},
	updateGroup: function (id, ruleIds) {
		const group = groups.find((x) => x.id == id);
		if (group) {
			group.ruleIds = ruleIds;
		} else {
			groups.push({ id, ruleIds });
		}
	},
	updateRule: function (id, content) {
		const rule = rules.find((x) => x.id == id);
		if (rule) {
			rule.content = content;
		} else {
			rules.push({ id, content });
		}
	},
	removeGroup: function (id) {
		groups = groups.filter((group) => group.id != id);
	},
});
