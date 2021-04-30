import SecondaryButton from '../ui/SecondaryButton';

export default {
  title: 'ui/SecondaryButton',
  component: SecondaryButton
};

const Template = (args) => <SecondaryButton {...args} />;

export const Story = Template.bind({});
Story.args = {};