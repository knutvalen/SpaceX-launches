import PrimaryButton from '../ui/PrimaryButton';

export default {
  title: 'PrimaryButton',
  component: PrimaryButton
};

const Template = (args) => <PrimaryButton {...args} ></PrimaryButton>;

export const FirstStory = Template.bind({});

FirstStory.args = {};