import PrimaryButton from '../ui/PrimaryButton';

export default {
  title: 'ui/PrimaryButton',
  component: PrimaryButton
};

const Template = (args) => <PrimaryButton {...args} />;

export const Story = Template.bind({});
Story.args = {};