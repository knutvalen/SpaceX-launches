import PrimaryButton from '../ui/PrimaryButton';

export default {
  title: 'ui/PrimaryButton',
  component: PrimaryButton
};

const Template = (args) => <PrimaryButton {...args}>{args.text}</PrimaryButton>;

export const Story = Template.bind({});
Story.args = {
  text: 'Button',
};