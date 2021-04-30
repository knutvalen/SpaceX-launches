import SecondaryButton from '../ui/SecondaryButton';

export default {
  title: 'ui/SecondaryButton',
  component: SecondaryButton
};

const Template = (args) => <SecondaryButton {...args}>{args.text}</SecondaryButton>;

export const Story = Template.bind({});
Story.args = {
  text: 'Button',
};