import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './label';
import { Input } from './input';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="example-input">Project Name</Label>
      <Input id="example-input" placeholder="Enter project name" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="required-input">
        Width <span className="text-destructive">*</span>
      </Label>
      <Input id="required-input" placeholder="24" required />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="desc-input">Material Thickness</Label>
      <p className="text-xs text-muted-foreground">
        Standard thickness is 3/4&quot; (0.75&quot;)
      </p>
      <Input id="desc-input" placeholder="0.75" type="number" step="0.0625" />
    </div>
  ),
};
