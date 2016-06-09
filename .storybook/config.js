import { configure } from '@kadira/storybook';

import '../source/style.css';

const req = require.context('../source/components/', true, /.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
