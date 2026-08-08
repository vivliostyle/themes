import { format } from 'oxfmt';
import { parse } from 'postcss';
import variableTheming from 'postcss-variable-theming';
import { groupedPropAlias } from 'postcss-variable-theming/preset';

import oxfmtrc from '../../../.oxfmtrc.json' with { type: 'json' };

/** @type {import('postcss').Plugin} */
const oxfmt = {
  postcssPlugin: 'oxfmt',
  async OnceExit(root, { result }) {
    const from = result.opts.from ?? 'input.css';
    const { code, errors } = await format(from, root.toString(), oxfmtrc);
    if (errors.length > 0) {
      throw new Error(
        `oxfmt failed to format ${from}:\n${errors.map(({ message }) => message).join('\n')}`,
      );
    }
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
    oxfmt,
  ],
};
