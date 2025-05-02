import 'dotenv/config'

const providers = {
	netlify: {
		name: `Netlify`,
		status: `company`,
		legalName: `Netlify, Inc.`,
		legalAddress: `2325 3rd Street, Suite 296 <br>San Francisco, California 94107 <br>USA`,
		email: `support@netlify.com`,
		url: `https://netlify.com`
	},
	deuxfleurs: {
		name: `Deuxfleurs`,
		status: `non-profit`,
		legalName: `Deuxfleurs`,
		legalAddress: `RDC - Appt. 1 <br>16 rue de la Convention <br>59800 Lille <br>FRANCE`,
		email: `ca@deuxfleurs.fr`,
		url: `https://deuxfleurs.fr`
	}
}

export default () => {
	if (process?.env?.NETLIFY) {
		return providers.netlify
	}
	return providers.deuxfleurs
}
