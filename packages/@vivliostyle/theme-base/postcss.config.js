import { format } from 'oxfmt';
import { parse } from 'postcss';
import variableTheming from 'postcss-variable-theming';
import { groupedPropAlias } from 'postcss-variable-theming/preset';

import oxfmtrc from '../../../.oxfmtrc.json' with { type: 'json' };
import extractCssVariables from './plugins/extract-css-variables.ts';

/**
 * @param {string} file
 * @param {string} source
 * @returns {Promise<string>}
 */
async function formatCode(file, source) {
  const { code, errors } = await format(file, source, oxfmtrc);
  if (errors.length > 0) {
    throw new Error(
      `oxfmt failed to format ${file}:\n${errors.map(({ message }) => message).join('\n')}`,
    );
  }
  return code;
}

/** @type {import('postcss').Plugin} */
const oxfmt = {
  postcssPlugin: 'oxfmt',
  async OnceExit(root, { result }) {
    const from = result.opts.from ?? 'input.css';
    const code = await formatCode(from, root.toString());
    const formatted = parse(code, { from });
    root.removeAll();
    root.append(formatted.nodes);
    root.raws = formatted.raws;
  },
};

export default {
  plugins: [
    variableTheming({
      prefix: 'vs-',
      propAlias: {
        ...groupedPropAlias,
        color: 'text-color',
      },
    }),
    extractCssVariables({
      prefix: 'vs-',
      output: 'css-variables.yml',
      defineOutput: 'css/define.css',
      jsonOutput: 'dist/css-variables.json',
      format: formatCode,
    }),
    oxfmt,
  ],
};
