import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './select';
import { Label } from './label';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <option value="">Select an option</option>
      <option value="plywood">Plywood</option>
      <option value="mdf">MDF</option>
      <option value="hardwood">Hardwood</option>
      <option value="other">Other</option>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="material-select">Material Type</Label>
      <Select id="material-select" defaultValue="plywood">
        <option value="plywood">Plywood</option>
        <option value="mdf">MDF</option>
        <option value="hardwood">Hardwood</option>
        <option value="other">Other</option>
      </Select>
    </div>
  ),
};

export const MaterialThickness: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="thickness-select">Material Thickness</Label>
      <Select id="thickness-select" defaultValue="0.75">
        <option value="0.25">1/4&quot; (0.25&quot;)</option>
        <option value="0.5">1/2&quot; (0.5&quot;)</option>
        <option value="0.625">5/8&quot; (0.625&quot;)</option>
        <option value="0.75">3/4&quot; (0.75&quot;)</option>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="plywood">
      <option value="plywood">Plywood</option>
      <option value="mdf">MDF</option>
      <option value="hardwood">Hardwood</option>
    </Select>
  ),
};

export const UnitType: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="unit-select">Unit Type</Label>
      <Select id="unit-select" defaultValue="cabinet">
        <option value="cabinet">Cabinet</option>
        <option value="drawer">Drawer</option>
      </Select>
    </div>
  ),
};
