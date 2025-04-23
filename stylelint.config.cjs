
const { propertyGroups } = require('stylelint-config-clean-order')

const propertiesOrder = propertyGroups.map((properties) => ({
	noEmptyLineBetween: true,
	emptyLineBefore: 'never', // Don't add empty lines between order groups.
	properties
}))

module.exports = {
	extends: [
		'stylelint-config-clean-order',
		'stylelint-config-recommended'
	],
	rules: {
		'order/properties-order': [
			propertiesOrder,
			{
				severity: 'warning',
				unspecified: 'bottomAlphabetical',
			}
		]
		}
}
