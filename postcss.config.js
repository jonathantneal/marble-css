module.exports = (ctx) => ({
	map: ctx.options.map,
	plugins: [
		require('postcss-import')(),
		require('postcss-preset-env')({
			insertBefore: {
				'css-variables': [
					require('postcss-extend-rule')(),
					require('postcss-simple-vars')({
						silent: true
					})
				]
			},
			stage: 0
		}),
		require('postcss-size')(),
		require('postcss-svg')(),
		require('autoprefixer')()
	].concat(
		process.argv.includes('--compress') ? [
			require('cssnano')({
				normalizeUrl: false,
				preset: ['default', {
					normalizeUrl: false
				}]
			}),
			compress()
		] : [
			require('postcss-discard-comments')(),
			require('postcss-discard-duplicates')(),
			require('postcss-discard-overridden')(),
			require('postcss-discard-empty')(),
			require('postcss-merge-rules')(),
			require('postcss-calc')(),
			compress()
		]
	)
});

// tooling
const postcss = require('postcss');

// plugin
const compress = postcss.plugin('postcss-discard-tested-duplicate-declarations', (opts) => (root) => {
	const testProp  = opts && 'testProp' in opts ? opts.testProp : (prop) => !/^:*-/.test(prop);
	const testValue = opts && 'testValue' in opts ? opts.testValue : (value) => !/(^var|^\s*-|\s+-\w+-)/.test(value);

	root.walkRules((rule) => {
		var propsMap = {};

		rule.nodes.slice(0).forEach((decl) => {
			if (testProp(decl.prop) && testValue(decl.value)) {
				const prevDecl = propsMap[decl.prop];

				if (prevDecl) {
					if (testValue(prevDecl.value)) {
						if (decl.import || !prevDecl.import) {
							prevDecl.remove();

							propsMap[decl.prop] = decl;
						} else {
							decl.remove();
						}
					}
				} else {
					propsMap[decl.prop] = decl;
				}
			}
		})
	});
});
