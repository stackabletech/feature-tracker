module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts, css}'],
	theme: {
		extend: {
			backgroundImage: {
				rocket: 'url("/img/rocket.png")',
				launch: 'url("/img/launch.png")'
			}
		}
	},
	plugins: [require('daisyui')]
};
