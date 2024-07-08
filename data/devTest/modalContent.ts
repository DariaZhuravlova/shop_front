export const modalContent = {
  title: 'gggggg',
  icon: 'mdi-account',
  content: [
    {
      type: 'text',
      text: 'text 11111 text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111text 11111',
    },
    {
      type: 'divider',
    },
    {
      type: 'text',
      display: 'inline-block',
      text: 'text 222222 inline',
    },
    {
      type: 'text',
      display: 'inline-block',
      text: 'text 222222 inline',
    },
    {
      type: 'component',
      display: 'block',
      component: 'TestForModal',
      dir: 'atom',
    },
    {
      type: 'component',
      display: 'block',
      component: 'TestModal',
      dir: 'molecule',
    },
  ],
};